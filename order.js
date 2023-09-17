const mongoose = require('mongoose');

const orderSchema=new mongoose.Schema({
    items: [
        {
          qty: String,
          price: Number
        }
      ],
      date: { type: Date, default: Date.now }
})

const orderCollection=new mongoose.model('order',orderSchema)

module.exports=orderCollection;