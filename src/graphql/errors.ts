// errors.ts
class TimeoutError extends Error {
  constructor(message = 'Timeout exceeded') {
    super(message);
    this.name = 'TimeoutError';
  }
}

export {
  TimeoutError
};
