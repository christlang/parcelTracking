

class Browser {
  constructor(t) {
    this.t = t;
  }

  getLocation() {
    /* global window */
    return this.t.eval(() => window.location);
  }

  maximizeWindow() {
    return this.t.maximizeWindow();
  }
}

module.exports = Browser;
