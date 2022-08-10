class Maybe {
  static just(value) {
    return new Just(value);
  }

  static nothing() {
    return new Nothing();
  }

  static fromNullable(value) {
    return value != null ? Maybe.just(value) : Maybe.nothing();
  }

  static of(value) {
    return Maybe.just(value);
  }

  isNothing() {
    return false;
  }

  isJust() {
    return false;
  }
}

class Just extends Maybe {
  constructor(value) {
    super();
    this.value = value;
  }

  map(fn) {
    return Maybe.of(fn(this.value));
  }

  else(other) {
    return this.value;
  }

  filter(fn) {
    return Maybe.fromNullable(fn(this.value) ? this.value : null);
  }

  isJust() {
    return true;
  }

  toString() {
    return `Maybe.Just(${this.value})`;
  }
}

class Nothing extends Maybe {
  map(fn) {
    return this;
  }

  get value() {
    throw new TypeError("Can't extract the value of a Nothing");
  }

  else(other) {
    return other;
  }

  filter() {
    return this.value;
  }

  isNothing() {
    return true;
  }

  toString() {
    return "Maybe.Nothing";
  }
}

const fn = () => (Math.random() > 0.5 ? 1 : null);

const value = Maybe.fromNullable(fn()).map((x) => {
  console.log(x);
  return x;
});

console.log(value);
