import { HttpException, HttpStatus } from "@nestjs/common";

export class ServiceException extends HttpException {
    constructor(public readonly mainMessage: string,
        public readonly errors: string[] = [],
        status: HttpStatus = HttpStatus.BAD_REQUEST
    ){
        super({
            mainMessage,
            errors
        }, status)
    }
}