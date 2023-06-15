const express = require("express");
const router = express.Router();


const userinfo = [
    {
      usernumber: 4,
      username: "김서경",
      pwd: 1562,
      category: "friend",
    },
    {
      usernumber: 3,
      username: "윤지수",
      pwd: 2974,
      category: "friend",
    },
    {
      usernumber: 2,
      username: "장한나",
      pwd: 1513,
      category: "friend",
    },
    {
      usernumber: 1,
      username: "백설아",
      pwd: 1652,
      category: "friend",
    },
  ];
 

  router.get("/userinfo",(req,res)=>{
    res.json({ userinfo :userinfo});
  });


  router.get("/userinfo/:usernumber", (req,res)=> {
    const { usernumber } =  req.params;



    const [detail]  = userinfo.filter((userinfo) => Number(usernumber) === userinfo.usernumber); 

    res.json({detail});
  });

//post API
  const Comment = require("../schemas/comment.js");
  router.post("/posts", async (req, res) => {
    const { usernumber } = req.params;
    const { COMMENTS } = req.body;
  
    const existsComments = await Comment.find({ usernumber });
    if (existsComments.length) {
      return res.status(400).json({ 
        success: false, 
        errorMessage: "이미 코멘트를 등록하셨습니다." });
    }
  
    await Comment.create({ usernumber, COMMENTS });
  
    res.json({ result: "success" });
  });

//수정 API
  router.put("/puts", async (req, res) => {
    const { usernumber } = req.params;
    const { COMMENTS } = req.body;
  
    const existsComments = await Comment.find({ usernumber: Number(usernumber) });
    if (existsComments.length) {
      await Comment.updateOne(
        { usernumber: usernumber }, 
        { $set: { COMMENTS } });
    }
  
    res.status(200).json({ success: true });
  })


//삭제 API
  router.delete("/deletes", async (req, res) => {
    const { usernumber } = req.params;
  
    const existsComments = await Comment.find({ usernumber });
    if (existsComments.length) {
      await Comment.deleteOne({ usernumber });
    }
  
    res.json({ result: "success" });
  });

  const Userinfo =require("../schemas/userinfo.js");
  router.post("/userinfo", async (req,res) =>{
 
    const {usernumber, username, pwd, category} = req.body;

    const userinfo = await Userinfo.find({usernumber});
    if( userinfo.length){
      return res.status(400).json({
        success: false,
        errorMessage:"이미 존재하는 usernumber 입니다."
      });
    }
    const createdUserinfo =await Userinfo.create({usernumber, username, pwd, category});
    res.json({userinfo: createdUserinfo});
  })

 module.exports = router;