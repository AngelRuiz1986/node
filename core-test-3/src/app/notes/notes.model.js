var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
    title: {type: 'string', required: true},
    description: {type: 'string', required: true},
    tags: [{type: mongoose.Schema.Types.ObjectId, ref:"Tags"}],
})

module.exports = mongoose.model('note', noteSchema);