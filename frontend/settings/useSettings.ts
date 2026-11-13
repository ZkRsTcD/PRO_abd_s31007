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

    const [passwordInput, setPasswordInput] = useState<string>('');
    

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
        //console.log("test")
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

    const handleToggleUser = useCallback((userId: number) => {
        setAssignedUsersIds((prev) => prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]);
        setAnyChangeInPermissions(true);
    }, [])

    const handleToggleMenu = useCallback((menuId: number) => {
        setPermittedMenuIds((prev) => prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]);
        setAnyChangeInPermissions(true)
    }, []);

    const handleSubmitChanges = async() => {
        const addedAssignedUsersIds = assignedusersIds.filter(id => !prevAssignedUsersIds.includes(id));
        const removedAssignedUsersIds = prevAssignedUsersIds.filter(id => !assignedusersIds.includes(id));

        const addedPermittedMenuIds = permittedMenuIds.filter(id => !prevPermittedMenuIds.includes(id));
        const removedPermittedMenuIds = prevPermittedMenuIds.filter(id => !permittedMenuIds.includes(id));

        console.log("test")
        if(selectedRoleId){
            if(addedAssignedUsersIds.length !== 0 || removedAssignedUsersIds.length !== 0){
                await settingsApi.updateRoleUserPermissions({roleId: selectedRoleId, toAdd: addedAssignedUsersIds, toRemove: removedAssignedUsersIds});
            }
            if(addedPermittedMenuIds.length !== 0){
                await settingsApi.createRoleMenuPermissions({roleId: selectedRoleId, toAdd: addedPermittedMenuIds});
            }
            if(removedPermittedMenuIds.length !== 0){
                await settingsApi.removeRoleMenuPermissions({roleId: selectedRoleId, toRemove: removedPermittedMenuIds});
            }
        }

        loadRoles();
        setAnyChangeInPermissions(false);
    }

    const handlePasswordChange = async() => {

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
        passwordInput,
        handleSelectRole,
        handleToggleUser,
        handleToggleMenu,
        handleSubmitChanges,
        handlePasswordChange
    }
}
