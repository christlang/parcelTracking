import { Selector } from 'testcafe';

class ParcelPageObject {
  constructor(t) {
    this.t = t;
    this.new = Selector('#new');
    this.logout = Selector('#logout');
    this.currentTable = Selector('#current');
    this.archiveTable = Selector('#archive');
  }

  async clickLogout() {
    return this.t.click(this.logout);
  }

  async clickEdit(parcel) {
    return this.t.click(Selector(`#${parcel}`));
  }

  static async iconIsYes(cssClass, rowSelector) {
    const icon = await rowSelector.find('.arrived').getAttribute('src');

    return icon === '/yes.png';
  }

  async clickNew() {
    return this.t.click(this.new);
  }

  async getTableOpenCount() {
    return this.currentTable.find('tbody').find('tr').count;
  }

  async getTableArchiveCount() {
    return this.archiveTable.find('tbody').find('tr').count;
  }

  async getTableArchiveRow(nr) {
    const row = this.archiveTable.find('tbody').find('tr').nth(nr);
    const orderInfo = await row.find('.orderInfo').innerText;
    const receiver = await row.find('.receiver').innerText;
    const orderDate = await row.find('.orderDate').innerText;
    const destination = await row.find('.destination').innerText;
    const itemInCentral = await ParcelPageObject.iconIsYes('.itemInCentral', row);
    const sentFromCentralWith = await row.find('.sentFromCentralWith').innerText;
    const sentFromCentral = await row.find('.sentFromCentral').innerText;
    const comment = await row.find('.comment').innerText;
    const arrived = await ParcelPageObject.iconIsYes('.arrived', row);

    return {
      orderInfo,
      receiver,
      orderDate,
      destination,
      itemInCentral,
      sentFromCentralWith,
      sentFromCentral,
      comment,
      arrived,
    };
  }
}

module.exports = ParcelPageObject;
