const express = require("express");
const router = express.Router();

const PickedUpUserOrder = require('../models/pickedupUserOrder');

router.post("",(req,res,next)=>{
  const PickedUpUserOder = new PickedUpUserOrder({
    doctorName: req.body.doctorName,
    doctorContact: req.body.doctorContact,
    doctorEmail: req.body.doctorEmail,
    drugNames: req.body.drugName,
    drugPrice: req.body.drugPrice,
    drugQuantity: req.body.drugQuantity,
    totalAmount: req.body.totalAmount,
    pickupDate: req.body.pickupDate,
    supplierEmail: req.body.supplierEmail,
  });

  PickedUpUserOder.save().then(createdDocOder=>{
    res.status(201).json({
      message:'Picked Up User Oder Added Successfully',
      doctorOderId : createdDocOder._id
    });
  });
});

router.get("",(req,res,next)=>{
  PickedUpUserOrder.find().then(documents=>{
    res.status(200).json({
      message : 'User picked up oder added sucessfully',
      doctorOders :documents
    });
  });
});
router.get("/enteredemail/:email",(req,res,next)=>{
  PickedUpUserOrder.find({supplierEmail: req.params.email}).then(documents=>{
    res.status(200).json({
      message : 'User picked up oder added sucessfully',
      doctorOders :documents
    });
  });
});





module.exports = router;
