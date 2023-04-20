export class NotFoundError extends Error {
    message = 'Content was not found';
    constructor() {
        super();
    }
}
export class PermissionDeniedError extends Error {
    message = 'Server deny your request';
    constructor() {
        super();
    }
}
export class ValidationError extends Error {
    message = 'Not valid request';
    constructor() {
        super();
    }
}
export class IdNotFoundError extends Error {
    message = 'Id was not found';
    constructor() {
        super();
    }
}
