const express=require('express');
const router = express.Router();
const person = require('./../models/person');

router.post('/',async(req,res)=>{           //router.post() creates a POST API endpoint.
  try{
  const data = req.body                    // Assuming the request body contains the person JSON to javscript data
  const newperson = new person(data);     // Create a new Person document using the Mongoose model
 //When creating a document, you use the model name (or the variable that holds the model):
 //Creates a document instance. Attaches schema rules.Prepares it for validation.Prepares it for saving.
 
  const response = await newperson.save();             // Save the new person to the database          
  console. log('data saved successfully');
  res.status(200).json(response);           
  }
  catch(err){
    console. log('Error saving person:', err);
    res.status(500).json({error: 'Internal server error'})
  }
})

router.get('/',async(req,res)=>{
  try{
    const data = await person.find();
    console. log('data saved successfully');
    res.status(200).json(data);  

  }catch(err){
     console. log('Error saving person:', err);
     res.status(500).json({error: 'Internal server error'})

  }
})

router.get('/:worktype',async(req,res)=>{
     const worktype=req.params.worktype;
     try{
       if(worktype == "chef"|| worktype=="manager"|| worktype=="waiter"){
       const response = await person.find({work:worktype});
       res.status(200).json(response);
       }else{
         res.status(404).json({error:'invalid'});
        }
      }catch(error){
      console.log(error);
      res.status(500).json({error:'server error'});
}
})

router.put('/:id',async(req,res)=>{
  try{
    const personid=req.params.id;
    const updatedperson = req.body;

    const response = await person.findByIdAndUpdate(personid,updatedperson,{
      new:true,
      runValidators:true,
    })
    if(!response){
      return res.status(404).json({error:"person not found"});

    }
    console.log("data updated");
    res.status(200).json(response);

  }catch(error){
    console.log(error);
    res.status(500).json({error:'server error'});

}
})

router.delete('/:id',async(req,res)=>{
  try{
    const personid=req.params.id;
    const response = await person.findByIdAndDelete(personid);

    if(!response){
      return res.status(404).json({error:"person not found"});

    }
    console.log("data deleted");
    res.status(200).json(response);

   
  }catch(error){
    console.log(error);
    res.status(500).json({error:'server error'});
  }
})
module.exports=router;