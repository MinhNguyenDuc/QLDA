module.exports = (app) => {
    const campaigns = require('../controllers/campaign.controller.js');

    // Create a new Note
    app.post('/campaigns', campaigns.create);

    // Retrieve all Notes
    app.get('/campaigns', campaigns.findAll);

    // Retrieve a single Note with noteId
    app.get('/campaigns/:campaignId', campaigns.findOne);
}