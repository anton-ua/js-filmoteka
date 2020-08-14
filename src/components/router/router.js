export class Router {
  constructor({ root, routes }) {
    this.root = root || '/';
    this.routes = routes || [];
    this.listen();
  }

  removeCornerSlashes = path =>
    path.toString().replace(/\/$/, '').replace(/^\//, '');

  getFragment() {
    let fragment = this.removeCornerSlashes(
      decodeURI(window.location.pathname + window.location.search),
    );
    fragment = fragment.replace(/\?(.*)$/, '');
    fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    return this.removeCornerSlashes(fragment);
  }

  navigate(path = '') {
    window.history.pushState(
      null,
      null,
      this.root + this.removeCornerSlashes(path),
    );
  }

  listen() {
    clearInterval(this.interval);
    this.interval = setInterval(this.interval.bind(this), 50);
  }

  interval() {
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();
    this.routes.some(route => {
      const match = this.current.match(route.path);
      if (match) {
        match.shift();
        route.callback.apply({}, match);
        return match;
      }
      return false;
    });
  }
}
