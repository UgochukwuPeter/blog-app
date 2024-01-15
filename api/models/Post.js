const mongoose= require('mongoose');

const PostSchema = new  mongoose.Schema({
    img: {type: String},
    date: {type: String},
    title: {type: String, required: true, unique: true},  
    desc: {type: String},
  },{timestamps:true});
  
  module.exports = mongoose.model("Post", PostSchema);