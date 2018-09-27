const model = require('./model');
const view = require('./view');
const form = require('./form');

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

function unarchiveAction(request, response) {
    const id = parseInt(request.params.id, 10);
    model.unarchive(id);
    response.redirect(request.baseUrl);
}

function formAction(request, response) {
    let parcel = {
        order: '',
        destination: '',
        receiver: '',
        orderDate: '',
        itemInHaiger: false,
        sentFromHaigerDate: '',
        sentFromHaigerWith: '',
        arrivedAtDestination: false,
        comment: '',
        itemProcessed: false
    };

    if (request.params.id) {
        const id = parseInt(request.params.id, 10);
        parcel = model.get(id);
    }

    const body = form(parcel);
    response.send(body);
}

function saveAction(request, response) {
    const parcel = {
        id: request.body.id,
        order: request.body.order,
        destination: request.body.destination,
        receiver: request.body.receiver,
        orderDate: request.body.orderDate,
        itemInHaiger: request.body.itemInHaiger,
        sentFromHaigerDate: request.body.sentFromHaigerDate,
        sentFromHaigerWith: request.body.sentFromHaigerWith,
        arrivedAtDestination: request.body.arrivedAtDestination,
        comment: request.body.comment,
        itemProcessed: request.body.itemProcessed
    };
    model.save(parcel);
    response.redirect(request.baseUrl);
}

module.exports = {
    listAction,
    archiveAction,
    unarchiveAction,
    formAction,
    saveAction
};