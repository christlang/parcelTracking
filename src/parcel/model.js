const sqlite = require('sqlite3');

const config = require('../config').getConfig();

const db = new sqlite.Database(config.database);

/**
 * The return-value will be used directly in a sql-query. So make sure
 * is not dangerous. Uses a whitelist of allowed values.
 *
 * @param orderBy
 * @return {*}
 */
function getCheckedCreteria(orderBy) {
  if (['id', 'destination', 'arrivedAtDestination'].includes(orderBy)) {
    return orderBy;
  }
  return 'id';
}

function getAll(orderBy) {
  const orderCriteria = getCheckedCreteria(orderBy);

  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Parcels ORDER BY ${orderCriteria}`;
    db.all(query, [orderCriteria], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function getAllArchivedOrNot(arrivedAtDestination, orderBy) {
  const orderCriteria = getCheckedCreteria(orderBy);

  return new Promise((resolve, reject) => {
    const query = arrivedAtDestination
      ? `SELECT * FROM Parcels WHERE arrivedAtDestination IS NOT NULL ORDER BY ${orderCriteria}`
      : `SELECT * FROM Parcels WHERE arrivedAtDestination IS NULL ORDER BY ${orderCriteria}`;
    db.all(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function getAllArchived(orderBy) {
  return getAllArchivedOrNot(true, orderBy);
}

function getAllOpen(orderBy) {
  return getAllArchivedOrNot(false, orderBy);
}

function insert(parcel) {
  return new Promise((resolve, reject) => {
    const query = `
INSERT INTO Parcels 
    (
          orderInfo, 
          destination, 
          receiver, 
          orderDate, 
          itemInCentral, 
          sentFromCentral, 
          sentFromCentralWith, 
          arrivedAtDestination, 
          comment
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(query, [
      parcel.orderInfo,
      parcel.destination,
      parcel.receiver,
      parcel.orderDate,
      parcel.itemInCentral,
      parcel.sentFromCentral,
      parcel.sentFromCentralWith,
      parcel.arrivedAtDestination,
      parcel.comment,
    ], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function update(parcel) {
  return new Promise((resolve, reject) => {
    const query = `
UPDATE Parcels
SET 
    orderInfo = ?, 
    destination = ?, 
    receiver = ?, 
    orderDate = ?, 
    itemInCentral = ?, 
    sentFromCentral = ?, 
    sentFromCentralWith = ?, 
    arrivedAtDestination = ?, 
    comment = ?
WHERE id = ?
`;
    db.run(query, [
      parcel.orderInfo,
      parcel.destination,
      parcel.receiver,
      parcel.orderDate,
      parcel.itemInCentral,
      parcel.sentFromCentral,
      parcel.sentFromCentralWith,
      parcel.arrivedAtDestination,
      parcel.comment,
      parcel.id,
    ], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function getOne(id) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM Parcels WHERE id = ?';
    db.get(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function archive(id, date) {
  return new Promise((resolve, reject) => {
    const query = `
UPDATE Parcels
SET 
    arrivedAtDestination = ?
WHERE id = ?
`;
    db.run(query, [
      date,
      id,
    ], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function unarchive(id) {
  return new Promise((resolve, reject) => {
    const query = `
UPDATE Parcels
SET 
    arrivedAtDestination = NULL
WHERE id = ?
`;
    db.run(query, [
      id,
    ], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  getAll,
  getAllOpen,
  getAllArchived,
  archive,
  unarchive,
  get(id) {
    return getOne(id);
  },
  save(parcel) {
    if (parcel.id) {
      return update(parcel);
    }
    return insert(parcel);
  },
};
