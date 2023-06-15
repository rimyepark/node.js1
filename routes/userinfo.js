const express = require("express");
const router = express.Router();

//user 정보
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
 
//user정보를 검색한다.
  router.get("/userinfo",(req,res)=>{
    res.json({ userinfo :userinfo});
  });

//user 정보를 디테일하게 검색한다. user 번호로
  router.get("/userinfo/:usernumber", (req,res)=> {
    const { usernumber } =  req.params;

    const [detail]  = userinfo.filter((userinfo) => Number(usernumber) === userinfo.usernumber); 

    res.json({detail});
  });

 //post API
 //user번호에다 comment를 적게끔 만들었다.
  const Guestbook = require("../schemas/guestbook.js");
  router.post("/userinfo/:usernumber/comment", async (req, res) => {
    const { usernumber } = req.params;
    const { comment } = req.body;
  
 //if문을 써서 이미 코멘트를 등록했다면 이미 코멘트를 등록하셨습니다 라고 표시하게 만든다.
    const existsGuestbooks = await Guestbook.find({ usernumber });
    if (existsGuestbooks.length) {
      return res.status(400).json({ 
        success: false, 
        errorMessage: "이미 코멘트를 등록하셨습니다." });
    }
  
    await Guestbook.create({ usernumber, comment });
  
    res.json({ result: "success" });
  });

//수정 API 
  router.put("/userinfo/:usernumber/comment", async (req, res) => {
    const { usernumber } = req.params;
    const { comment } = req.body;
  
    const existsGuestbooks = await Guestbook.find({ usernumber: Number(usernumber) });
    if (existsGuestbooks.length) {
      await Guestbook.updateOne(
        { usernumber: usernumber }, 
        { $set: { comment } });
    }
  
    res.status(200).json({ success: true });
  })


//삭제 API
  router.delete("/userinfo/:usernumber/comment", async (req, res) => {
    const { usernumber } = req.params;
  
    const existsGuestbooks = await Guestbook.find({ usernumber });
    if (existsGuestbooks.length) {
      await Guestbook.deleteOne({ usernumber });
    }
  
    res.json({ result: "success" });
  });

  //user의 정보를 입력하는 API
  //user번호가 겹치지 않게 만들었다.
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