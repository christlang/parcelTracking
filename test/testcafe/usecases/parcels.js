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