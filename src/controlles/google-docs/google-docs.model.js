const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const GoogleDocsModelSchema = new mongoose.Schema({
    user: { type: ObjectId, ref: 'User' },
    googleId: { type: String },
    fileName: { type: String },
    permissions: [{
        user: { type: ObjectId, ref: 'User' },
        role: { type: String },
        type: { type: String },
        emailAddress: { type: String }
    }]
}, { timestamps: true });



GoogleDocsModelSchema.statics.findAndUpdate = function (filter, update) {
    return this.findOneAndUpdate(filter, update, { new: true });
};


const GoogleDocsModel = mongoose.model('GoogleDocs', GoogleDocsModelSchema);

module.exports = GoogleDocsModel;
