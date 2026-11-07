import React from "react";
import SettingsUsers from "./SettingsUsers";
import { useSettings } from "../useSettings";
import SettingsRoles from "./SettingsRoles";
import SettingsMenu from "./SettingsMenu";
import './Settings.css'


const Settings: React.FC = () => {
    const {
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
        handleToggleUser,
        handleToggleMenu,
        handleSubmitChanges
    } = useSettings();


    return (
        <div className="Settings">
            <h1>Ustawienia</h1>
            <div className="UserSettings">
                <label>UWAGA: Przypisując konto do wybranej roli nadpisujesz jego dotychczasowe przypisanie do roli.</label>
                {loadingUsers && <p>Trwa pobieranie danych o użytkownikach z bazy...</p>}
                {usersError && <p>Błąd połączenia: {usersError}</p>}
                {!loadingUsers && !usersError && (
                    <SettingsUsers users={users} assignedusersIds={assignedusersIds} onSelect={handleToggleUser}/>     //Info o błędach i ładowaniu do przeniesienia wewnątrz samej listy
                )}
                {/* <SettingsUsers accounts={users} roleAffiliation={} passwordChange={} personalDataChange={}/> */}
            </div>
            <div className="RoleSettings">
                {loadingRoles && <p>Trwa pobieranie danych o rolach z bazy...</p>}
                {rolesError && <p>Błąd połączenia: {rolesError}</p>}
                {!loadingRoles && !rolesError && (
                    <SettingsRoles roles={roles} selectedRoleId={selectedRoleId} onSelect={handleSelectRole}/>
                )}
            </div>
            <div className="MenuSettings">
                {loadingMenu && <p>Trwa pobieranie danych o menu z bazy...</p>}
                {menuError && <p>Błąd połączenia: {menuError}</p>}
                {!loadingMenu && !menuError && (
                    <SettingsMenu menu={menu} permittedMenuIds={permittedMenuIds} onSelect={handleToggleMenu}/>
                )}
            </div>
            <div className="SubmitButton">
                {anyChangeInPermissions && (
                    <button onClick={() => handleSubmitChanges}>Zatwierdź zmiany</button>
                )}
            </div>
        </div>
    )
}

export default Settings;
