import { Subdistrict } from "../common/interfaces/subdistrict";
import { Supervisor } from "../supervisors/supervisor";

export interface Member {
    id: number,
    name: string,
    phoneNumber: string,
    createdAt: Date,
    subdistrict: Subdistrict,
    supervisor: Supervisor,
    votersCount: number,
}