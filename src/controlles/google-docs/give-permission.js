const { google } = require('googleapis');
const GoogleDocsModel = require('./google-docs.model');
const UserModel = require('../user/user.model')
const getOauth2Client = require('../../lib/google-drive')


const givePermissions = async (req) => {
    try {
        if (!req.user.refreshToken) {
            return req.sendResponse(422, {
              message: 'You have to connect google account'
            })
          }
          const drive = getOauth2Client(req.user.refreshToken);
        const googleDocs = await GoogleDocsModel.findOne({ googleId: req.params.id });
        if (!googleDocs) {
            return req.sendResponse(422, {
                message: 'Requested doc not found'
            })
        }
        for (let index = 0; index < req.body.permissions.length; index++) {
            const element = req.body.permissions[index];
            const response = await drive.permissions.create({
                resource: element,
                fileId: req.params.id,
                fields: 'id',
                sendNotificationEmail: true,
            })
            const user = await UserModel.findOne({ email: element.emailAddress });
            if (user) {
                element.user = user._id;
            }
            await GoogleDocsModel.findOneAndUpdate({ _id: googleDocs._id }, { $push: { permissions: element } })
        }
        
        return req.sendResponse(200, {
            message: 'Permission allocated successfully',
        });
    } catch (error) {
        return req.sendResponse(500, error);
    }
}

module.exports = givePermissions;