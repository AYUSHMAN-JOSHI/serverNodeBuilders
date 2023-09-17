const mongoose=require("mongoose")

const conn = mongoose.connect("mongodb+srv://ayushman_ai_ml:ayushman@cluster0.et76g6e.mongodb.net/mern?retryWrites=true")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log(e);
});

module.exports = conn;