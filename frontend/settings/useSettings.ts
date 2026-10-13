import { useCallback, useEffect, useState } from "react";
import { settingsApi } from "./settingsApi";
import type { User, Role, Menu } from './typesSettings'

export function useSettings() {
    const [users, setUsers] = useState<User[]>([]);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loadingRoles, setLoadingRoles] = useState<boolean>(true);
    const [menu, setMenu] = useState<Menu[]>([]);

    const [usersError, setUsersError] = useState<string|null>(null);
    const [rolesError, setRolesError] = useState<string|null>(null);
    

    const loadUsers = useCallback(async () => {
        try {
            setLoadingUsers(true);
            const data = await settingsApi.getUsers();
            setUsers(data);
            setUsersError(null);
        } catch (err) {
            setUsersError(err instanceof Error ? err.message : 'Błąd pobierania danych');
        } finally {
            setLoadingUsers(false);
        }
    }, []);

    const loadRoles = useCallback(async () => {
        try {
            setLoadingRoles(true);
            const data = await settingsApi.getRoles();
            setRoles(data);
            setRolesError(null);
        } catch (err) {
            setRolesError(err instanceof Error ? err.message : 'Błąd pobierania danych');
        } finally {
            setLoadingRoles(false);
        }
    }, []);

    useEffect(() => {
        loadUsers();
    }, [loadUsers])



    return {
        users,
        loadingUsers,
        roles,
        loadingRoles,
        menu,
        usersError,
        rolesError,
        loadUsers,
        loadRoles
    }
}
