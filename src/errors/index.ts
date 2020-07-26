class UnresolvableContext extends Error {
  constructor(m: string) {
    super(m);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UnresolvableContext.prototype);
  }

  toJSON() {
    return JSON.stringify(
      {
        message: this.message,
      },
      null,
      2
    );
  }
}

class UnresolvableDid extends Error {
  constructor(m: string) {
    super('UnresolvableDid -> ' + m);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UnresolvableDid.prototype);
  }

  toJSON() {
    return JSON.stringify(
      {
        message: this.message,
      },
      null,
      2
    );
  }
}

class UnsupportedUri extends Error {
  constructor(m: string) {
    super(m);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UnsupportedUri.prototype);
  }

  toJSON() {
    return JSON.stringify(
      {
        message: this.message,
      },
      null,
      2
    );
  }
}

export { UnresolvableContext, UnsupportedUri, UnresolvableDid };
