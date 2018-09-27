let data = [
    { id: 1,
        order: 'carburettor',
        destination: 'Mbagathi',
        receiver: 'Werkstat',
        orderDate: '2018-08-02',
        itemInHaiger: true,
        sentFromHaigerDate: '2018-08-03',
        sentFromHaigerWith: 'Frank',
        arrivedAtDestination: true,
        comment: '',
        itemProcessed: false
    },
    { id: 2,
        order: 'transistor',
        destination: 'Mbagathi',
        receiver: 'Benjamin',
        orderDate: '2018-08-02',
        itemInHaiger: true,
        sentFromHaigerDate: '2018-09-24',
        sentFromHaigerWith: 'Axel',
        arrivedAtDestination: true,
        comment: '',
        itemProcessed: false
    },
    { id: 3,
        order: 'Raspberry Pi',
        destination: 'Arua',
        receiver: 'Martin',
        orderDate: '2018-08-02',
        itemInHaiger: false,
        sentFromHaigerDate: '',
        sentFromHaigerWith: '',
        arrivedAtDestination: false,
        comment: '',
        itemProcessed: false
    },
    { id: 4,
        order: 'WLAN-Antenna',
        destination: 'Aru',
        receiver: 'Hans',
        orderDate: '2018-08-02',
        itemInHaiger: false,
        sentFromHaigerDate: '',
        sentFromHaigerWith: '',
        arrivedAtDestination: false,
        comment: '',
        itemProcessed: false
    },
    { id: 5,
        order: 'turbine blade',
        destination: 'Tinderet',
        receiver: 'Siggi',
        orderDate: '2018-08-02',
        itemInHaiger: true,
        sentFromHaigerDate: '2018-08-09',
        sentFromHaigerWith: 'Uwe',
        arrivedAtDestination: '2018-08-15',
        comment: 'every thing okay',
        itemProcessed: true
    }
];

function getNextId() {
    return Math.max(...data.map(parcel => parcel.id)) + 1;
}

function insert(parcel) {
    parcel.id = getNextId();
    data.push(parcel);
}

function update(parcel) {
    parcel.id = parseInt(parcel.id, 10);
    const index = data.findIndex(item => item.id === parcel.id);
    data[index] = parcel;
}

module.exports = {
    getAll() {
        return data;
    },
    archive(id) {
        data = data.map(order => {
            if (order.id === id) {
                order.itemProcessed = true;
            }
            return order;
        });
    },
    unarchive(id) {
        data = data.map(order => {
            if (order.id === id) {
                order.itemProcessed = false;
            }
            return order;
        });
    },
    get(id) {
        return data.find(parcel => parcel.id === id);
    },
    save(parcel) {
        parcel.id === '' ? insert(parcel) : update(parcel);
    }
};