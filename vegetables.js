const mongoose = require('mongoose');

const vegetableSchema = new mongoose.Schema(
    {
        vegetable: {
            type: String,
            required: true,
        },
        rate: {
            type: Number,
            required: true
        }
    },
    {
        collection: 'vegetables'
    }
);

const vegetableCollection = new mongoose.model('vegetableSchema', vegetableSchema);

module.exports = vegetableCollection;