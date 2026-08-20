import type {ErrorStatuses, SuccessStatuses} from './status';

interface ReturnErrorProps {
    status: string;
    statusCode: ErrorStatuses;
    id: number;
    message: string;
}

export interface ReturnErrorReturn {
    type: 'Error';
    status: string;
    statusCode: ErrorStatuses;
    trace: `${string}:${string}:${ErrorStatuses}${number}`;
    message: string;
}

interface ReturnSuccessProps<T> {
    status: string;
    statusCode: SuccessStatuses;
    id: number;
    data: T;
}

export interface ReturnSuccessReturn<T> {
    type: 'Success';
    status: string;
    statusCode: SuccessStatuses;
    trace: `${string}:${string}:${SuccessStatuses}${number}`;
    data: T;
}

export class ReturnBuilder {
    constructor(private readonly path: string) {
    }

    function(functionName: string): FunctionReturnBuilder {
        return new FunctionReturnBuilder(this.path, functionName);
    }
}

export class FunctionReturnBuilder {
    constructor(private readonly path: string, private readonly functionName: string) {
    }

    error({status, statusCode, id, message}: ReturnErrorProps): ReturnErrorReturn {
        return {
            type: 'Error',
            status,
            statusCode,
            trace: `${this.path}:${this.functionName}:${statusCode}${id}`,
            message,
        };
    }

    success<T>({status, statusCode, data, id}: ReturnSuccessProps<T>): ReturnSuccessReturn<T> {
        return {
            type: 'Success',
            status,
            statusCode,
            trace: `${this.path}:${this.functionName}:${statusCode}${id}`,
            data,
        };
    }
}
