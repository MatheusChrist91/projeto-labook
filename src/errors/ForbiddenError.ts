import { BaseError } from "./BaseError";

export class ForbiddenError extends BaseError {
    constructor(
        message: string = "Você não tem autorização, vaza!" 
    ) {
        super(403, message)
    }
}