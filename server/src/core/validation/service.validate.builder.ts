import ValidationErrorBuilder from "./validation.error.builder";

export class ServiceValidateBuilder {

    private errorBuilder: ValidationErrorBuilder;

    static create() {
        return new ServiceValidateBuilder()
    }

    constructor(mainErrorMessage?: string, errorMessages?: string[]) {
        this.errorBuilder = new ValidationErrorBuilder(mainErrorMessage, errorMessages)
    }

    fieldNotEmpty(field: unknown, nameField: string, customMessage?: string | (() => string)) {
        if (this.isEmpty(field)) {
            const message = typeof customMessage === 'function' ? customMessage() : 
            customMessage ?? `O campo ${nameField} deve ser informado`

            this.errorBuilder.addErrorMessage(message)
        }
            
        return this
    }

    private isEmpty(value: unknown) {
        if(value === null || value === undefined) return true

        if(typeof value === 'string'){
            return value.trim().length === 0
        }

        return false
    }

    custom(condition: boolean, message: string) {
        if(!condition) this.errorBuilder.addErrorMessage(message)
        return this
    }

    addError(message: string){
        this.errorBuilder.addErrorMessage(message)
        return this
    }

    throwIfInvalid() {
        this.errorBuilder.throwIfErrorsExist()
    }

}