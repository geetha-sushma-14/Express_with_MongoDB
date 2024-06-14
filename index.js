const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main()
.then(()=>{console.log("connection successful")})
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsaap');
  };


//show all chats
app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
    res.render("index.ejs",{chats});
});
//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});
//create route
app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    newChat.save()
        .then((res)=>{console.log("saved")})
        .catch((err)=>console.log(err));
    res.redirect("/chats");
});
//edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
});
//update route
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg}=req.body;
    Chat.findByIdAndUpdate(id,
        {msg:msg},
        {runValidators:true,new:true})
        .then((res)=>{console.log("good");})
        .catch((err)=>{res.send(err.errors.msg.message);})
    res.redirect("/chats");
});
//delete route
app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedchat=await Chat.findByIdAndDelete(id);
    res.redirect("/chats")
});
app.get("/",(req,res)=>{
    res.redirect("/chats")
});
app.listen(8080,()=>{
    console.log("listening on port 8080");
});
