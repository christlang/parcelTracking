
class Browser {

    constructor(t) {
        this.t = t;
    }

    getLocation() {
        return this.t.eval(() => window.location);
    }

    maximizeWindow() {
        return this.t.maximizeWindow();
    }
}

module.exports = Browser;