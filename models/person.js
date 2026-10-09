const { uniq } = require('lodash');
const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required : true,
        unique :true
    },
    address:{
        type:String
    },
    salary:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        required:true,
        type:String
    }
});

personSchema.pre('save',async function(){
    const person= this;
    //hash password only if its modified (or is new)
    if(!person.isModified('password'))return;
    
   try{ 
    // hash password generation
    const salt=await bcrypt.genSalt(10);
    //hash password
    const hashedpassword=await bcrypt.hash(person.password,salt);

    // override the plain password with hashed one
    person.password=hashedpassword;
  
   }catch(err){
   

}
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //use bcrypt to compare the provided password with hashed passowrd
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}





// create person model
const person=mongoose.model('person',personSchema);
module.exports = person;