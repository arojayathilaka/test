const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userid:{
        type: Number,
        default: -1
    },
    username:{
        type: String,
        default: ''
    },
    contact:{
        type: Number,
        default: -1
    },
    email:{
        type: String,
        default: ''
    },
    password:{
        type: String,
        default: ''
    }
});

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

const UserDetails = mongoose.model('UserDetails', userSchema);

module.exports = UserDetails;