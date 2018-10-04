import { Selector } from 'testcafe';

class ParcelFormObject {

    constructor(t) {
        this.t = t;
        this.submit = Selector('#submit');
        this.orderInfo = Selector('#orderInfo');
        this.destination = Selector('#destination');
        this.receiver = Selector('#receiver');
        this.orderDate = Selector('#orderDate');
        this.itemInCentral = Selector('#itemInCentral');
        this.sentFromCentral = Selector('#sentFromCentral');
        this.sentFromCentralWith = Selector('#sentFromCentralWith');
        this.comment = Selector('#comment');
        this.arrivedAtDestination = Selector('#arrivedAtDestination');
    }

    async save() {
        return this.t.click(this.submit);
    }

    async enterOrderInfo(orderInfo) {
        return this.t.typeText(this.orderInfo, orderInfo);
    }

    async enterDestination(destination) {
        return this.t.typeText(this.destination, destination);
    }

    async enterReceiver(receiver) {
        return this.t.typeText(this.receiver, receiver);
    }

    async enterOrderDate(orderDate) {
        return this.t.typeText(this.orderDate, orderDate);
    }

    async enterItemInCentral(itemInCentral) {
        return this.t.typeText(this.itemInCentral, itemInCentral);
    }

    async enterSentFromCentral(sentFromCentral) {
        return this.t.typeText(this.sentFromCentral, sentFromCentral);
    }

    async enterSentFromCentralWith(sentFromCentralWith) {
        return this.t.typeText(this.sentFromCentralWith, sentFromCentralWith);
    }

    async enterComment(comment) {
        return this.t.typeText(this.comment, comment);
    }

    async enterArrived(arrived) {
        return this.t.typeText(this.arrivedAtDestination, arrived);
    }

}

module.exports = ParcelFormObject;