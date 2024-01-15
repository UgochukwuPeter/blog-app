const router = require('express').Router();
const Post = require("../models/Post");
const verify = require('../verifyToken');

//CREATE NEW POST
router.post("/",verify, async(req, res)=>{
    if( req.user.isAdmin ){
       const newPost = new Post(req.body);
       try{
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
       }catch(err){
        res.status(500).json(err)
       }
       }else{
        res.status(403).json("You are not  allowed");
       }
});

//UPDATE POST
router.put("/:id",verify, async(req, res)=>{
    if( req.user.isAdmin ){
       try{
            const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set: req.body}, {new: true});
            res.status(200).json(updatedPost);
       }catch(err){
        res.status(500).json(err)
       }
       }else{
        res.status(403).json("You are not  allowed");
       }
});
//DELETE POST
router.delete("/:id",verify, async(req, res)=>{
    if( req.user.isAdmin ){
       try{
        await Post.findByIdAndDelete(req.params.id);
            res.status(200).json("Post has been deleted");
       }catch(err){
        res.status(500).json(err)
       }
       }else{
        res.status(403).json("You are not  allowed");
       }
});
//GET ALL POST
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts.reverse());
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET NEWEST POST
router.get("/newest", async (req, res) => {
    try {
        const newestPost = await Post.findOne().sort({ _id: -1 });
        res.status(200).json(newestPost);
    } catch (err) {
        res.status(500).json(err);
    }
});


//Fetch Two random post
router.get("/two", async (req, res) => {
    const query = req.query.new;
    try {
        let posts;

        if (query) {
            // Fetch two newest posts
            posts = await Post.find().sort({ _id: -1 }).limit(2);
        } else {
            // Fetch two random posts
            posts = await Post.aggregate([{ $sample: { size: 2 } }]);
        }

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET ANY POST
router.get("/find/:id", async(req, res)=>{
    try{
     const post = await Post.findById(req.params.id);
         res.status(200).json(post);
    }catch(err){
     res.status(500).json(err)
    }
});

//GET RANDOM POST
router.get('/random', async (req, res) => {
    try {
        const count = await Post.countDocuments();
        
        // Generate a random index within the total number of posts
        const randomIndex = Math.floor(Math.random() * count);
        
        // Fetch a single random post using the generated index
        const randomPost = await Post.findOne().skip(randomIndex);

        if (!randomPost) {
            return res.status(404).json({ error: 'No posts available' });
        }
        res.status(200).json(randomPost);
    } catch (err) {
        console.error('Error fetching random post:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports =  router;