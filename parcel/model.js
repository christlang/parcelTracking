const sqlite = require('sqlite3');
const db = new sqlite.Database('./parcel-dev.db');

function getAll() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Parcels';
        db.all(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function getAllArchived() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Parcels WHERE itemProcessed = 1';
        db.all(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function getAllOpen() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Parcels WHERE itemProcessed = 0';
        db.all(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
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