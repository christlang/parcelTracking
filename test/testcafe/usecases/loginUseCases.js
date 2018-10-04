const {port} = require('../config');
const Browser = require('../html/browser');
const Login = require('../html/LoginPageObject');

fixture `login`
    .page `http://localhost:${port}`;

test('incorrect login', async t => {
    const login = new Login(t);
    const browser = new Browser(t);

    await login.enterUser('test');
    await login.enterPass('a');
    await login.clickSubmit();

    const location = await browser.getLocation();
    await t.expect(location.pathname).eql('/login');
});

test('correct login', async t => {
    const login = new Login(t);
    const browser = new Browser(t);

    await login.enterUser('test');
    await login.enterPass('test');
    await login.clickSubmit();

    const location = await browser.getLocation();

    await t.expect(location.pathname).eql('/parcel');
});