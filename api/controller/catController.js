const Breed = require('../model/breed.js');

exports.create = (req, res) => {
    if(!req.body.name || !req.body.origin) {
        return res.status(400).send({
            message: "Breed name or origin can not be empty"
        });
    }

    const breed = new Breed({
        name: req.body.name,
        description: req.body.description,
        temperament: req.body.temperament,
        origin: req.body.origin
    });

    breed.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Breed."
        });
    });
};

exports.findAll = (req, res) => {
    Breed.find()
    .then(breeds => {
        res.send(breeds);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving breeds."
        });
    });
};

exports.findById = (req, res) => {
    Breed.findById(req.params.breedId)
    .then(breed => {
        if(!breed) {
            return res.status(404).send({
                message: "Breed not found with id " + req.params.breedId
            });
        }
        res.send(breed);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Breed not found with id " + req.params.breedId
            });
        }
        return res.status(500).send({
            message: "Error retrieving breed with id " + req.params.breedId
        });
    });
};

exports.findByName = (req, res) => {
    Breed.find({"name": { $regex: '.*' + req.params.breedName + '.*' }})
    .then(breed => {
        if(!breed) {
            return res.status(404).send({
                message: "Breed not found by name " + req.params.breedName
            });
        }
        res.send(breed);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Breed not found by name " + req.params.breedName
            });
        }
        return res.status(500).send({
            message: "Error retrieving breed by name " + req.params.breedName
        });
    });
};
