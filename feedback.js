const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        data: {
            type: String
        }
    },
    {
        collection: 'feedback'
    }
);

const feedbackCollection = new mongoose.model('feedbackSchema', feedbackSchema);

module.exports = feedbackCollection; 