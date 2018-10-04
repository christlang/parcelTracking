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

    async getTableOpenCount() {
        return getById('current').find('tbody').find('tr').count;
    }

    async getTableArchiveCount() {
        return getById('archive').find('tbody').find('tr').count;
    }
}

module.exports = Parcel;