let data = [
    { id: 1,
        order: 'carburettor',
        destination: 'Mbagathi',
        receiver: 'Werkstat',
        orderDate: '2.8.2018',
        itemInHaiger: true,
        sentFromHaigerDate: '3.8.2018',
        sentFromHaigerWith: 'Frank',
        arrivedAtDestination: true,
        comment: '',
        itemProcessed: false
    },
    { id: 2,
        order: 'transistor',
        destination: 'Mbagathi',
        receiver: 'Benjamin',
        orderDate: '2.8.2018',
        itemInHaiger: true,
        sentFromHaigerDate: '24.9.2018',
        sentFromHaigerWith: 'Axel',
        arrivedAtDestination: true,
        comment: '',
        itemProcessed: false
    },
    { id: 3,
        order: 'Raspberry Pi',
        destination: 'Arua',
        receiver: 'Martin',
        orderDate: '2.8.2018',
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
        orderDate: '2.8.2018',
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
        orderDate: '2.8.2018',
        itemInHaiger: true,
        sentFromHaigerDate: '9.8.2018',
        sentFromHaigerWith: 'Uwe',
        arrivedAtDestination: '15.8.2018',
        comment: 'every thing okay',
        itemProcessed: true
    }
];

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
    }
};