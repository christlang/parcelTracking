import { Selector } from 'testcafe';

const getById = Selector(value => {
    return document.getElementById(value);
});


class Login {

    constructor(t) {
        this.t = t;
    }

    async enterUser(username) {
        return this.t.typeText(getById('username'), username);
    }

    async enterPass(password) {
        return this.t.typeText(getById('password'), password);
    }

    async submit() {
        return this.t.click(getById('submit'));
    }

    async loginTestUser() {
        await this.enterUser('test');
        await this.enterPass('test');
        await this.submit();
    }

}

module.exports = Login;