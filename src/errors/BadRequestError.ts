import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
    constructor(
        message: string = "Requisição inválida" 
    ) {
        super(400, message)
        console.log(`Erro ${this.statusCode}: ${this.message}`);
    }

    
}
