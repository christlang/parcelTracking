const sqlite = require('sqlite3');

const config = require('../config').getConfig();
const db = new sqlite.Database(config.database);

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

function getAllArchivedOrNot(processed, orderBy) {
    const orderCriteria = getCheckedCreteria(orderBy);

    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Parcels WHERE itemProcessed = ? ORDER BY ${orderCriteria}`;
        db.all(query, [processed], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function getAllArchived(orderBy) {
    return getAllArchivedOrNot(1, orderBy);
}

function getAllOpen(orderBy) {
    return getAllArchivedOrNot(0, orderBy);
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
          comment, 
          itemProcessed
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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
            parcel.itemProcessed
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
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
    comment = ?, 
    itemProcessed = ?
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
            parcel.itemProcessed,
            parcel.id
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
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
        })
    });
}

function archive(id) {
    return new Promise((resolve, reject) => {
        const query = `
UPDATE Parcels
SET 
    itemProcessed = ?
WHERE id = ?
`;
        db.run(query, [
            1,
            id
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
}

function unarchive(id) {
    return new Promise((resolve, reject) => {
        const query = `
UPDATE Parcels
SET 
    itemProcessed = ?
WHERE id = ?
`;
        db.run(query, [
            0,
            id
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
}

module.exports = {
    getAll,
    getAllOpen,
    getAllArchived,
    archive,
    unarchive,
    unarchive,
    get(id) {
        return getOne(id);
    },
    save(parcel) {
        if (parcel.id) {
            return update(parcel);
        } else {
            return insert(parcel);
        }
    }
};