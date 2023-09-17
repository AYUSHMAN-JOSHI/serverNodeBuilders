const mongoose = require('mongoose');

const upiSchema = new mongoose.Schema(
    {
        upiID: { type: String, required: true, unique: true },
        amount: {type: Number, required: true}
    },
    { collection: 'upi' }
);

const upiCollection = mongoose.model('upiSchema', upiSchema);

module.exports = upiCollection;