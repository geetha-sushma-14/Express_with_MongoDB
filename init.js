const mongoose=require("mongoose");
main()
.then(()=>{console.log("connection successful")})
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsaap');
  };
const Chat=require("./models/chat.js");
let allChats=[{
    from:"neha",
    to:"priya",
    msg:"send me exam papers",
    created_at:new Date()
},{
    from:"sush",
    to:"sai",
    msg:"hii brother",
    created_at:new Date()
},{
    from:"devi",
    to:"nani",
    msg:"bring me some fruits",
    created_at:new Date()
},{
    from:"tony",
    to:"peter",
    msg:"love you 3000",
    created_at:new Date()
}]
Chat.insertMany(allChats);
