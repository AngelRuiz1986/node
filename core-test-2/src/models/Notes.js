var mongoose  = require('mongoose');
var NoteSchema = mongoose.Schema({
    title: {type:String, required: true},
    description: {type:String, required: true},
    date: {type: Date, default: Date.now}
})
module.exports = mongoose.model('Notes', NoteSchema);