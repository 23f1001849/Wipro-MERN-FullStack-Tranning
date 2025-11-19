class Dispatcher {
  constructor() {
    this.callbacks = [];
  }

  register(callback) {
    this.callbacks.push(callback);
    return callback;
  }

  dispatch(action) {
    this.callbacks.forEach((callback) => callback(action));
  }
}

export default Dispatcher;
