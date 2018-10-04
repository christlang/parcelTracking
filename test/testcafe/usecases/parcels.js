const {port} = require('../config');
const Browser = require('../html/browser');
const Login = require('../html/login');
const Parcels = require('../html/parcels');
const ParcelsForm = require('../html/parcelsForm');

fixture `parcels`
    .page `http://localhost:${port}`;




test('logout', async t => {
    const login = new Login(t);
    const browser = new Browser(t);

    await login.enterUser('test');
    await login.enterPass('test');
    await login.submit();

    const parcels = new Parcels(t);
    await parcels.logout();

    const location = await browser.getLocation();

    await t.expect(location.pathname).eql('/login.html');
});


test('edit parcel and just save should not change field arrived', async t => {
    const login = new Login(t);
    const browser = new Browser(t);

    await login.enterUser('test');
    await login.enterPass('test');
    await login.submit();

    const parcels = new Parcels(t);
    const parcelsForm = new ParcelsForm(t);

    await t.expect(await parcels.getTableOpenCount()).eql(2)
        .expect(await parcels.getTableArchiveCount()).eql(3);

    await parcels.clickEdit('edit-3');
    await parcelsForm.save();

    await t.expect(await parcels.getTableOpenCount()).eql(2)
        .expect(await parcels.getTableArchiveCount()).eql(3);
});

test.only('create new parcel with all fields', async t => {
    const login = new Login(t);

    await login.enterUser('test');

    await login.enterPass('test');
    await login.submit();

    const parcels = new Parcels(t);
    const parcelsForm = new ParcelsForm(t);

    const openParcels = await parcels.getTableOpenCount();
    const archivedParcels = await parcels.getTableArchiveCount();

    await parcels.clickNew();
    await parcelsForm.enterOrderInfo('order-field');
    await parcelsForm.enterDestination('dest-field');
    await parcelsForm.enterReceiver('receiver-field');
    await parcelsForm.enterOrderDate('2018-10-03');
    await parcelsForm.enterItemInCentral('on');
    await parcelsForm.enterSentFromCentral('2018-10-04');
    await parcelsForm.enterSentFromCentralWith('with-field');
    await parcelsForm.enterComment('comment-field');
    await parcelsForm.enterArrived('2018-10-24');
    await parcelsForm.save();

    const newRow = await parcels.getTableArchiveRow(archivedParcels);

    await t.expect(await parcels.getTableOpenCount()).eql(openParcels)
        .expect(await parcels.getTableArchiveCount()).eql(archivedParcels + 1)
        .expect(JSON.stringify(newRow)).eql(JSON.stringify({
            orderInfo: 'order-field',
            receiver: 'receiver-field',
            orderDate: '2018-10-03',
            destination: 'dest-field',
            itemInCentral: true,
            sentFromCentralWith: 'with-field',
            sentFromCentral: '2018-10-04',
            comment: 'comment-field',
            arrived: true
        }));
});