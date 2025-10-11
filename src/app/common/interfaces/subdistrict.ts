import { District } from "./district";

export interface Subdistrict {
    id: number,
    name: string,
    createdAt: Date,
    district: District,
}