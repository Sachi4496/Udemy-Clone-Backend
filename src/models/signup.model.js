const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const registrationSchema = new mongoose.Schema(
    {
      full_Name: { type: String,
        trim : true,
        minlength : 3
      },
      email:{ type:String,
        required:true,
        trim : true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
   
      },
      password:{type:String,
        required : true,
      trim : true,
      minlength : 5
      },
      tokens:[{
        token:{
          type:String,
          required:true
        }
      }]
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

  //const generateAuthToken = require('../controllers/signup.controller')
  //Generating token
  registrationSchema.methods.generateAuthToken = async function(req, res){
    try{
        const token = jwt.sign({_id:this._id},"mynameissurajkarosiafrommasaischool");
        this.tokens = this.tokens.concat({token:token})
        await this.save();
       // console.log("This is Your Token "+token);
        return token;
    }catch(e){
      res.status(500).send({message: e.message, status: "Inside model JWT"})
    }
  }

// Password hashing
  registrationSchema.pre("save",async function(next){
    this.password = await bcrypt.hash(this.password,10)
    next();
  })
  
  module.exports = mongoose.model("Register", registrationSchema);