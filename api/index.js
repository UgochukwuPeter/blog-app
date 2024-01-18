const express = require('express');
const mongoose= require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const cors = require('cors');

dotenv.config();
const app = express();
const port = process.env.PORT || 8800;

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB).then(()=>console.log('Database Connected Sucessfully'));
};

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

app.listen(port, ()=>{
    console.log('Backend connected succcessfully');
});