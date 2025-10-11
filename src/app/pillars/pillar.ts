import { Subdistrict } from "../common/interfaces/subdistrict";
import { Member } from "../members/member";
import { Supervisor } from "../supervisors/supervisor";

export interface Pillar {
    id: number,
    name: string,
    area: string,
    phoneNumber: string,
    votersCount: number,
    createdAt: Date,
    subdistrict: Subdistrict | null,
    supervisor: Supervisor | null,
    member: Member | null
}