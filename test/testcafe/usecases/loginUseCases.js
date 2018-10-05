const { url } = require('../config');
const Browser = require('../html/browser');
const Login = require('../html/LoginPageObject');

let login;
let browser;

fixture`login`
  .page`${url}`
  .beforeEach((t) => {
    login = new Login(t);
    browser = new Browser(t);
  });

test('incorrect login', async (t) => {
  await login.enterUser('test');
  await login.enterPass('a');
  await login.clickSubmit();

  const location = await browser.getLocation();
  await t.expect(location.pathname).eql('/login');
});

test('correct login', async (t) => {
  await login.enterUser('test');
  await login.enterPass('test');
  await login.clickSubmit();

  const location = await browser.getLocation();

  await t.expect(location.pathname).eql('/parcel');
});
