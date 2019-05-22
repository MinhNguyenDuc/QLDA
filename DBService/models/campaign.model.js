const mongoose = require('mongoose');

const CampaignSchema = mongoose.Schema({
    address: String,
    title: String,
    description: String,
    minimumContribution: Number,
    imageUrl : String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Campaign', CampaignSchema);