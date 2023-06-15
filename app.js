const express = require('express');
const app = express();
const port = 3000;

const UserinfoRouter = require("./routes/userinfo.js");
const CommentRouter = require("./routes/comments.js");
const connet =require("./schemas");
connet();

app.use(express.json());
app.use("/api",[UserinfoRouter, CommentRouter]);


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});