import { Response } from "./response";

export interface PaginatedResponse<T> extends Response {
    data: {
        items: T[],
        page: number,
        limit: number,
        total: number
    }
}