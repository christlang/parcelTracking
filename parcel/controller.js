const model = require('./model');
const view = require('./view');

function listAction(request, response) {
    const parcels = model.getAll();
    const body = view(parcels);
    response.send(body);
}

module.exports = {
    listAction,
};