const model = require('./model');
const view = require('./view');

function listAction(request, response) {
    const parcels = model.getAll();
    const body = view(parcels);
    response.send(body);
}

function archiveAction(request, response) {
    const id = parseInt(request.params.id, 10);
    model.archive(id);
    response.redirect(request.baseUrl);
}



module.exports = {
    listAction,
    archiveAction
};