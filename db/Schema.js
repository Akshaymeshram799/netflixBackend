const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String,
    },
    lastName:{
        required : true,
        type : String
    },
    email: {
        unique:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})

const userModal = mongoose.model('users', userSchema);
// userModal.createIndexes();
module.exports = {
    userModal
}