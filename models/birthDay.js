const mongoose = require('mongoose')

const BirthdaySchema = new mongoose.Schema({
    dob:{
        type:Date,
        required: true,
    },
      username: { type: String, required: true , unique:true},
      email: { type: String, required: true, unique:true },
    
},
{timeStamps: true}
)

const birthDay=mongoose.model("birthday", BirthdaySchema)
module.exports= birthDay