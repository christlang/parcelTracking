const model = require('./model');

function prepareParcelForList(parcels) {
    return parcels.map(parcel => {

        if (parcel.itemInCentral) {
            parcel.itemInCentralIcon = '/yes.png';
        } else {
            parcel.itemInCentralIcon = '/no.png';
        }

        if (parcel.arrivedAtDestination) {
            parcel.arrivedAtDestinationAction = 'unarchive';
            parcel.arrivedAtDestinationIcon = '/yes.png';
        } else {
            parcel.arrivedAtDestinationAction = 'archive';
            parcel.arrivedAtDestinationIcon = '/no.png';
        }

        parcel.orderDate = convertTimestampToDate(parcel.orderDate);
        parcel.sentFromCentral = convertTimestampToDate(parcel.sentFromCentral);
        parcel.arrivedAtDestination = convertTimestampToDate(parcel.arrivedAtDestination);

        return parcel;
    });
}

function prepareBooleanForSave(value) {
    if (value === 'on') {
        return 1;
    }
    return 0;
}

/**
 *
 *
 * @param timestamp expected format YYYY-MM-DD HH:MM:SS.SSS
 * @return format YYYY-MM-DD
 */
function convertTimestampToDate(timestamp) {
    if (timestamp === null) {
        return '';
    }
    return timestamp.substr(0, 10);
}

function listAction(request, response) {
    const orderBy = request.params.orderBy || 'id';

    Promise.all([
        model.getAllOpen(orderBy).then(prepareParcelForList),
        model.getAllArchived(orderBy).then(prepareParcelForList)
    ]).then(([parcelsOpen, parcelsArchive]) => {
            response.render(__dirname + '/views/list', {
                parcelsOpen, parcelsArchive });
        })
        .catch(error => {
            console.log(error);
            response.send(error)
        });
}

function archiveAction(request, response) {
    const id = parseInt(request.params.id, 10);
    const now = new Date();
    model.archive(id, now.toISOString());
    response.redirect(request.baseUrl);
}

function unarchiveAction(request, response) {
    const id = parseInt(request.params.id, 10);
    model.unarchive(id);
    response.redirect(request.baseUrl);
}

function formAction(request, response) {
    let parcel = {
        orderInfo: '',
        destination: '',
        receiver: '',
        orderDate: null,
        itemInCentral: false,
        sentFromCentral: null,
        sentFromCentralWith: '',
        arrivedAtDestination: false,
        comment: ''
    };

    if (request.params.id) {
        const parcelId = parseInt(request.params.id, 10);
        parcel = model.get(parcelId)
            .then(parcel => {
                parcel.orderDate = convertTimestampToDate(parcel.orderDate);
                parcel.sentFromCentral = convertTimestampToDate(parcel.sentFromCentral);
                parcel.arrivedAtDestination = convertTimestampToDate(parcel.arrivedAtDestination);

                response.render(__dirname + '/views/form', { parcel })
            })
            .catch(error => response.send(error));
    } else {
        response.render(__dirname + '/views/form', { parcel });
    }
}

function saveAction(request, response) {
    const parcel = {
        id: request.body.id,
        orderInfo: request.body.orderInfo,
        destination: request.body.destination,
        receiver: request.body.receiver,
        orderDate: request.body.orderDate,
        itemInCentral: prepareBooleanForSave(request.body.itemInCentral),
        sentFromCentral: request.body.sentFromCentral,
        sentFromCentralWith: request.body.sentFromCentralWith,
        arrivedAtDestination: request.body.arrivedAtDestination === '' ? null : request.body.arrivedAtDestination,
        comment: request.body.comment
    };
    model.save(parcel)
        .then(() => {
            response.redirect(request.baseUrl);
        })
        .catch(error => response.send(error));

}

module.exports = {
    listAction,
    archiveAction,
    unarchiveAction,
    formAction,
    saveAction
};