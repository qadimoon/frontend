import { Response } from "./response";

export interface SimpleResponse<T> extends Response {
    data: T
}