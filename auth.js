const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const person=require('./models/person');

passport.use(new LocalStrategy(async(username,password,done)=>{
  try{
    // console.log('received credentials:',USERNAME,PASSWORD);
    const user= await person.findOne({username:username});
    if(!user)
      return done(null,false,{message:'incorrect username'});
    const isPasswordMatch = await user.comparePassword (password);
    if(isPasswordMatch){
      return done(null,user);
    }else{
      return done(null,false,{message:'incorect password'});
    }

  }catch(err){
    return done(err);

  }
}));

module.exports = passport;