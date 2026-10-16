import axios from "axios";
import type { User, Role } from "./typesSettings";

const httpClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' }
})

export const settingsApi = {
    getUsers: async (): Promise<User[]> => {
        const { data } = await httpClient.get<User[]>('/settings/users')
        return data;
    },

    getRoles: async (): Promise<Role[]> => {
        const { data } = await httpClient.get<Role[]>('/settings/roles')
        return data;
    },

    getAssignedUsers: async (roleId: number): Promise<User[]> => {
        const { data } = await httpClient.get<User[]>(`/settings/assignedusers/${roleId}`)
        return data;
    }
}
