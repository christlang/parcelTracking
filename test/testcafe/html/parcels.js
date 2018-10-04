import { Selector } from 'testcafe';

const getById = Selector(value => {
    return document.getElementById(value);
});


class Parcel {

    constructor(t) {
        this.t = t;
    }

    async logout() {
        return this.t.click(getById('logout'));
    }

    async clickEdit(parcel) {
        return this.t.click(getById(parcel));
    }

    async clickNew() {
        return this.t.click(getById('new'));
    }

    async getTableOpenCount() {
        return getById('current').find('tbody').find('tr').count;
    }

    async getTableArchiveCount() {
        return getById('archive').find('tbody').find('tr').count;
    }

    async getTableArchiveRow(nr) {
        const row = getById('archive').find('tbody').find('tr').nth(nr);
        const id = row.find('td').nth(0);
        const orderInfo = await row.find('.orderInfo').innerText;
        const receiver = await row.find('.receiver').innerText;
        const orderDate = await row.find('.orderDate').innerText;
        const destination = await row.find('.destination').innerText;
        const itemInCentral = await row.find('.itemInCentral').getAttribute('src');
        const sentFromCentralWith = await row.find('.sentFromCentralWith').innerText;
        const sentFromCentral = await row.find('.sentFromCentral').innerText;
        const comment = await row.find('.comment').innerText;
        const arrived = await row.find('.arrived').getAttribute('src');

        return {
            orderInfo,
            receiver,
            orderDate,
            destination,
            itemInCentral: (itemInCentral === '/yes.png'),
            sentFromCentralWith,
            sentFromCentral,
            comment,
            arrived: (arrived === '/yes.png')
        };
    }
}

module.exports = Parcel;