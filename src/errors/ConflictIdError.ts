import { BaseError } from "./BaseError";

export class ConflictIdError extends BaseError {
    constructor(
        message: string = "Este 'id' já esciste em nosso banco de dados!"
    ) {
        super(400, message)
    }
}