const mongoose = require('mongoose');

const RolesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    description: {
        type: String,
        required: false,
        min: 6,
        max: 1024
    },
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Permissions"
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Roles', RolesSchema);