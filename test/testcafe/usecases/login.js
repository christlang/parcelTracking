const {port} = require('../config');
const Browser = require('../html/browser');
const Login = require('../html/login');

fixture `login`
    .page `http://localhost:${port}`;

test('incorrect login', async t => {
    const login = new Login(t);
    const browser = new Browser(t);

    await login.enterUser('test');
    await login.enterPass('a');
    await login.submit();

    const location = await browser.getLocation();
    await t.expect(location.pathname).eql('/login');
});

test('correct login', async t => {
    const login = new Login(t);
    const browser = new Browser(t);

    await login.enterUser('test');
    await login.enterPass('test');
    await login.submit();

    const location = await browser.getLocation();

    await t.expect(location.pathname).eql('/parcel');
});