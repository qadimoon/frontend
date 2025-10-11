import { Subdistrict } from "../common/interfaces/subdistrict";

export interface Supervisor {
    id: number,
    name: string,
    phoneNumber: string,
    createdAt: Date,
    subdistrict: Subdistrict,
    votersCount: number
}