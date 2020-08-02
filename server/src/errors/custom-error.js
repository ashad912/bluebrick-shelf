export default class CustomError extends Error {

    constructor(message){
        super(message)

        Object.setPrototypeOf(this, CustomError.prototype)

        if (new.target === CustomError) {
            throw new TypeError("Abstract class cannot be instantiated");
        }
    }

    serializeErrors() {
        throw new TypeError("Method must be implemented");
    }
}