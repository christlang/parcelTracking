import { Selector } from 'testcafe';

class LoginPageObject {
  constructor(t) {
    this.t = t;
    this.username = Selector('#username');
    this.password = Selector('#password');
    this.submit = Selector('#submit');
  }

  async enterUser(username) {
    return this.t.typeText(this.username, username);
  }

  async enterPass(password) {
    return this.t.typeText(this.password, password);
  }

  async clickSubmit() {
    return this.t.click(this.submit());
  }

  async loginTestUser() {
    await this.enterUser('test');
    await this.enterPass('test');
    await this.clickSubmit();
  }
}

module.exports = LoginPageObject;
