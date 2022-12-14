var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    name: {type: 'string', required: true},
    email: {type: 'string', required: true},
    password: {type: 'string', required: true},
    date: {type: Date, default: Date.now}
})

userSchema.methods.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash
}

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);