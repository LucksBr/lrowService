import { ServiceException } from "src/core/exceptions/service.exception";

export default class ValidationErrorBuilder {

    private errorMessages: string[] = [];
    private mainErrorMessage: string | undefined

    constructor (mainErrorMessage?: string, errorMessages?: string[]) {
        if(mainErrorMessage) this.setMainErrorMessage(mainErrorMessage)
        if(errorMessages) this.setErrorMessages(errorMessages)
    }

    setMainErrorMessage(message: string) {
        this.mainErrorMessage = message
    }

    setErrorMessages(messages: string[]) {
        this.errorMessages = messages
    }

    addErrorMessage(message: string) {
        this.errorMessages.push(message)
        return this
    }

    areThereErrors() {
        return this.errorMessages.length > 0
    }

    throwIfErrorsExist() {
        if (this.areThereErrors()) throw new ServiceException(this.getMainMessage(), this.errorMessages)
    }

    private getMainMessage() {
        return this.mainErrorMessage ?? this.buildDefaultMessage()
    }

    private buildDefaultMessage() {
        const qtdErrors = this.errorMessages.length
        return `${qtdErrors} error${qtdErrors > 1 ? 's' : ''}`
    }
    
}