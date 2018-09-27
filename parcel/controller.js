const model = require('./model');

function prepareParcelForList(parcel) {
    if (parcel.itemProcessed) {
        parcel.itemProcessedAction = 'unarchive';
        parcel.itemProcessedIcon = '/yes.png';
    } else {
        parcel.itemProcessedAction = 'archive';
        parcel.itemProcessedIcon = '/no.png';
    }

    if (parcel.itemInHaiger) {
        parcel.itemInHaigerIcon = '/yes.png';
    } else {
        parcel.itemInHaigerIcon = '/no.png';
    }

    if (parcel.arrivedAtDestination) {
        parcel.arrivedAtDestinationIcon = '/yes.png';
    } else {
        parcel.arrivedAtDestinationIcon = '/no.png';
    }
}

function listAction(request, response) {
    const parcels = model.getAll();

    parcels.forEach(prepareParcelForList);

    const parcelsOpen = parcels.filter(parcel => !parcel.itemProcessed);
    const parcelsArchive = parcels.filter(parcel => parcel.itemProcessed);
    response.render(__dirname + '/views/list', { parcelsOpen, parcelsArchive });
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

    response.render(__dirname + '/views/form', { parcel });
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