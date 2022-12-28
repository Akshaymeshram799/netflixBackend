const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    imageurl:{
        type:Array
    },
    genre:{
        type:Array
    },
    imdbid:String,
    title:String,
    imdbrating:String,
    released:String,
    type:String,
    synopsis:String
})


const ContentModel = new mongoose.model('contentCollection',contentSchema);

module.exports = {ContentModel};