const router = require('express').Router();
const Comment = require("../models/Comment");
const verify = require('../verifyToken');

//CREATE NEW COMMENT
router.post('/comments', async (req, res) => {
    try {
      const { postId, content } = req.body;
      const userId = req.user.id; // Assuming you have user authentication middleware
  
      // Validate input (add additional validation as needed)
      if (!postId || !content) {
        return res.status(400).json({ message: 'Invalid input data' });
      }
      // Create a new comment
      const comment = new Comment({
        postId,
        userId,
        content,
      });
  
      // Save the comment to the database
      const savedComment = await comment.save();
  
      res.status(201).json(savedComment);
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

//DELETE COMMENT
router.delete("/:id",verify, async(req, res)=>{
    if( req.user.isAdmin ){
       try{
        await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("Comment has been deleted");
       }catch(err){
        res.status(500).json(err)
       }
       }else{
        res.status(403).json("You are not  allowed");
       }
});

//GET ALL COMMENTS
router.get('/comments/:postId', async (req, res) => {
    try {
      const postId = req.params.postId;
  
      // Validate input (add additional validation as needed)
      if (!postId) {
        return res.status(400).json({ message: 'Invalid input data' });
      }
  
      // Find comments for the specified post ID
      const comments = await Comment.find({ postId });
  
      res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

module.exports =  router;