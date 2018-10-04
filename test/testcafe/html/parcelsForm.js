import { Selector } from 'testcafe';

const getById = Selector(value => {
    return document.getElementById(value);
});


class ParcelForm {

    constructor(t) {
        this.t = t;
    }

    async save() {
        return this.t.click(getById('submit'));
    }

}

module.exports = ParcelForm;