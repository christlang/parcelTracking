/* eslint no-console: ["error", { allow: ["warn", "error"] }]  */

const model = require('./model');

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

function convertToIcon(value) {
  if (value) {
    return '/yes.png';
  }
  return '/no.png';
}

function convertToAction(value) {
  if (value) {
    return 'unarchive';
  }
  return 'archive';
}

function prepareParcelForList(parcels) {
  return parcels.map((p) => {
    const parcel = p;
    parcel.itemInCentralIcon = convertToIcon(parcel.itemInCentral);
    parcel.arrivedAtDestinationIcon = convertToIcon(parcel.arrivedAtDestination);
    parcel.arrivedAtDestinationAction = convertToAction(parcel.arrivedAtDestination);

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

function listAction(request, response) {
  const orderBy = request.params.orderBy || 'id';

  Promise.all([
    model.getAllOpen(orderBy).then(prepareParcelForList),
    model.getAllArchived(orderBy).then(prepareParcelForList),
  ]).then(([parcelsOpen, parcelsArchive]) => {
    response.render(`${__dirname}/views/list`, { parcelsOpen, parcelsArchive });
  })
    .catch((error) => {
      console.warn(error);
      response.send(error);
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

function getEmptyParcel() {
  return {
    orderInfo: '',
    destination: '',
    receiver: '',
    orderDate: null,
    itemInCentral: false,
    sentFromCentral: null,
    sentFromCentralWith: '',
    arrivedAtDestination: false,
    comment: '',
  };
}

async function formAction(request, response) {
  let parcel = getEmptyParcel();

  if (request.params.id) {
    try {
      const parcelId = parseInt(request.params.id, 10);
      parcel = await model.get(parcelId);
      parcel.orderDate = convertTimestampToDate(parcel.orderDate);
      parcel.sentFromCentral = convertTimestampToDate(parcel.sentFromCentral);
      parcel.arrivedAtDestination = convertTimestampToDate(parcel.arrivedAtDestination);
    } catch (error) {
      response.send(error);
    }
  }
  response.render(`${__dirname}/views/form`, { parcel });
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
    comment: request.body.comment,
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
  saveAction,
};
