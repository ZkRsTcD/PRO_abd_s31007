import { useCallback, useEffect, useState } from "react";
import { settingsApi } from "./settingsApi";
import type { User, Role, Menu } from './typesSettings'

export function useSettings() {
    const [users, setUsers] = useState<User[]>([]);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loadingRoles, setLoadingRoles] = useState<boolean>(true);
    const [menu, setMenu] = useState<Menu[]>([]);
    const [loadingMenu, setLoadingMenu] = useState<boolean>(true);

    const [usersError, setUsersError] = useState<string|null>(null);
    const [rolesError, setRolesError] = useState<string|null>(null);
    const [menuError, setMenuError] = useState<string|null>(null);

    const [selectedRoleId, setSelectedRoleId] = useState<number|null>(null);
    const [assignedusersIds, setAssignedUsersIds] = useState<number[]>([]);
    const [permittedMenuIds, setPermittedMenuIds] = useState<number[]>([]);

    const [prevAssignedUsersIds, setPrevAssignedUsersIds] = useState<number[]>([]);
    const [prevPermittedMenuIds, setPrevPermittedMenuIds] = useState<number[]>([]);

    const [anyChangeInPermissions, setAnyChangeInPermissions] = useState<boolean>(false);
    

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
        //console.log(roles);
    }, []);

    const loadMenu = useCallback(async () => {
        try {
            setLoadingMenu(true);
            const data = await settingsApi.getMenu();
            setMenu(data);
            setMenuError(null);
        } catch (err) {
            setMenuError(err instanceof Error ? err.message : 'Błąd pobierania danych')
        } finally {
            setLoadingMenu(false);
        }
    }, []);

    const handleSelectRole = useCallback(async (roleId: number) => {
        setSelectedRoleId(roleId);
        try {
            const assignedUsers = await settingsApi.getAssignedUsers(roleId);
            const permittedMenu = await settingsApi.getPermittedMenu(roleId);
            setAssignedUsersIds(assignedUsers.map((u) => u.id));
            setPermittedMenuIds(permittedMenu.map((m) => m.id));
            setAnyChangeInPermissions(false);
            setPrevAssignedUsersIds(assignedUsers.map((u) => u.id));
            setPrevPermittedMenuIds(permittedMenu.map((m) => m.id));
        } catch (err) {
            console.error("Błąd pobierania przypisanych użytkowników", err)
        }
    }, []);

    //const handleToggleUser = useCallback(userId)

    const handleToggleMenu = useCallback((menuId: number) => {
        setPermittedMenuIds((prev) => prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]);
        setAnyChangeInPermissions(true)
    }, []);

    const handleSubmitChanges = async() => {
        const addedAssignedUsersIds = assignedusersIds.filter(id => !prevAssignedUsersIds.includes(id));
        const removedAssignedUsersIds = prevAssignedUsersIds.filter(id => !assignedusersIds.includes(id));

        const addedPermittedMenuIds = permittedMenuIds.filter(id => !prevPermittedMenuIds.includes(id));
        const removedPermittedMenuIds = prevPermittedMenuIds.filter(id => !permittedMenuIds.includes(id));

        if(selectedRoleId){
            await settingsApi.updateRolePermissions(selectedRoleId, addedAssignedUsersIds, removedAssignedUsersIds, addedPermittedMenuIds, removedPermittedMenuIds)
        }
    }

    useEffect(() => {
        loadUsers();
        loadRoles();
        loadMenu();
    }, [loadUsers, loadRoles, loadMenu])



    return {
        users,
        loadingUsers,
        roles,
        loadingRoles,
        menu,
        loadingMenu,
        usersError,
        rolesError,
        menuError,
        selectedRoleId,
        assignedusersIds,
        permittedMenuIds,
        anyChangeInPermissions,
        loadUsers,
        loadRoles,
        handleSelectRole,
        loadMenu,
        handleToggleMenu,
        handleSubmitChanges
    }
}
