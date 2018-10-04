import { Selector } from 'testcafe';

const getById = value => Selector('#'+value);

class ParcelForm {

    constructor(t) {
        this.t = t;
    }

    async save() {
        return this.t.click(getById('submit'));
    }

    async enterOrderInfo(orderInfo) {
        return this.t.typeText(getById('orderInfo'), orderInfo);
    }

    async enterDestination(destination) {
        return this.t.typeText(getById('destination'), destination);
    }

    async enterReceiver(receiver) {
        return this.t.typeText(getById('receiver'), receiver);
    }

    async enterOrderDate(orderDate) {
        return this.t.typeText(getById('orderDate'), orderDate);
    }

    async enterItemInCentral(itemInCentral) {
        return this.t.typeText(getById('itemInCentral'), itemInCentral);
    }

    async enterSentFromCentral(sentFromCentral) {
        return this.t.typeText(getById('sentFromCentral'), sentFromCentral);
    }

    async enterSentFromCentralWith(sentFromCentralWith) {
        return this.t.typeText(getById('sentFromCentralWith'), sentFromCentralWith);
    }

    async enterComment(comment) {
        return this.t.typeText(getById('comment'), comment);
    }

    async enterArrived(arrived) {
        return this.t.typeText(getById('arrivedAtDestination'), arrived);
    }

}

module.exports = ParcelForm;