const Campaign = require('../models/campaign.model.js');

// Create and Save a new Note
exports.create = (req, res) => {

    // Create a Note
    const campaign = new Campaign({
        title: req.body.title || "Untitled Note",
        description: req.body.description,
        address: req.body.address,
        minimumContribution: req.body.minimumContribution,
        imageUrl: req.body.imageUrl,
    });

    // Save Note in the database
    campaign.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Campaign.find()
        .then(campaigns => {
            res.send(campaigns);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

//Find a single note with a noteId
exports.findOne = (req, res) => {
    Campaign.find({address : req.params.campaignId})
        .then(campaign => {
            if(!campaign) {
                return res.status(404).send({
                    message: "Campaign not found with id " + req.params.campaignId
                });
            }
            res.send(campaign);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.campaignId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.campaignId
        });
    });
};

