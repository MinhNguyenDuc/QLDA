const mongoose = require('mongoose');


const campaignSchema = mongoose.Schema({
  title: String,
  contractAddress : String,
  description : String,
});

module.exports = mongoose.model('CampaignModel', campaignSchema);
// var campaign = mongoose.model('CampaignModel', campaignSchema);
//var newCampagin = new campaignSchema();
