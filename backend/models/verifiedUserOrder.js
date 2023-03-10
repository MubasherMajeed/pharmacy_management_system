const mongoose = require('mongoose');

const verifiedUserOderSchema = mongoose.Schema({
  doctorName: {type: String , require:true},
  doctorContact: {type: String , require:true},
  doctorEmail: {type: String , require:true},
  drugId : { type: Array , require: true},
  drugNames : { type: Array , require: true},
  drugPrice: {type: Array , require:true},
  drugQuantity: {type: Array , require:true},
  realQuantity: {type: Array , require:true},
  totalAmount : { type: String , require: true},
  pickupDate : { type: String , require: true},
  supplierEmail: {type: String , require:true},

})

module.exports = mongoose.model('VerifiedUserOrder',verifiedUserOderSchema);
