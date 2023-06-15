const express = require("express");
const router = express.Router();

const Comment = require("../schemas/comment.js");
const Userinfo = require("../schemas/userinfo.js");

router.get("/comments", async(req, res) => {
  const comments = await Comment.find({});

  const usernumbers = comments.map((comment) =>{
    return comment.usernumber;
  })

  const userinfo = await Userinfo.find({usernumbers: usernumbers});
  //userinfo에 해당하는 모든 정보를 가지고 올건데
  //만약 usernumbers 변수 안에 존재하는 값일 때만 가져와

  const results =comments.map((comment)=>{
    return {
      "COMMENTS": comment.COMMENTS,
      "userinfo": userinfo.find((item)=> item.usernumber===comment.usernumber),

    }
  })

  res.json({
    "comments": results,
  })

});


module.exports = router;