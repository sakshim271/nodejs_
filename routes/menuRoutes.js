const express=require('express');    // imports Express library store it in var express
const router =express.Router();     //  create router obj to use express feature here router
const menuitem = require('./../models/menu');

router.post('/',async(req,res)=>{
  try{
    const data2= req.body
    const newmenuitem= new menuitem(data2);
    const response= await newmenuitem.save();
    console.log('data saved');
    res.status(200).json(response);
  }catch(err){
    console.log('error',err);
    res.status(500).json({error:'internal server error'})
  }
})

router.get('/',async(req,res)=>{
  try{
    const data2= await menuitem.find();
    console.log('data saved');
    res.status(200).json(data2);
  }catch(err){
    console.log('error',err);
    res.status(500).json({error:'internal server error'})
  }
})

router.get('/:tastetype',async(req,res)=>{
      const tastetype=req.params.tastetype;
      try{
      if(tastetype=="spicy"||tastetype=="sweet"||tastetype=="sour"){
        const response = await menuitem.find({taste:tastetype});
        res.status(200).json(response);

      }else{
        res.status(404).json({error:"invalid type"})
      }
    }catch(err){
      console.log('error',err);
    res.status(500).json({error:'internal server error'})
    }
})

module.exports=router;