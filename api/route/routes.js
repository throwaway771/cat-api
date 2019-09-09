module.exports = (app) => {
    const breeds = require('../controller/catController.js');

    // Create a new Breed
    app.post('/breeds', breeds.create);

    // Get all breeds
    app.get('/breeds', breeds.findAll);

    // Get a breed by id
    app.get('/breeds/id/:breedId', breeds.findById);

    // Search a breed by name
    app.get('/breeds/name/:breedName', breeds.findByName);

}
