import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export default class GlobalExceptionFilter implements ExceptionFilter {
    
    catch(exception: unknown, host: ArgumentsHost) {
        const httpArgumentsHost = host.switchToHttp()
        const request = httpArgumentsHost.getRequest<Request>()
        const response = httpArgumentsHost.getResponse<Response>()

        let codeStatus = 500
        let mainMessage = 'Internal server error'
        let errors: string[] = []
        let stackTrace: string | undefined
        
        if (exception instanceof HttpException) {
            codeStatus = exception.getStatus()
            const responseException: any = exception.getResponse()

            if (typeof responseException === 'object') {
                mainMessage = responseException.mainMessage || responseException.message || mainMessage
                errors = responseException.errors || []
            } else {
                mainMessage = responseException
            }
        }

        const ambienteEnv = process.env.NODE_ENV || 'dev'

        if(ambienteEnv !== 'prod') stackTrace = (exception as any)?.stack

        response.status(codeStatus).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            mainMessage,
            errors,
            stackTrace
        })
    }
}