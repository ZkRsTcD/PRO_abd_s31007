import React from "react";
import SettingsUsers from "./SettingsUsers"
import { useSettings } from "../useSettings";
import SettingsRoles from "./SettingsRoles";
import './Settings.css'


const Settings: React.FC = () => {
    const {
        users,
        loadingUsers,
        roles,
        loadingRoles,
        menu,
        usersError,
        rolesError,
        loadUsers,
        loadRoles
        //
        //
        //
        //
    } = useSettings();


    return (
        <div className="Settings">
            <h1>Ustawienia</h1>
            <div className="UserSettings">
                {loadingUsers && <p>Trwa pobieranie danych o użytkownikach z bazy...</p>}
                {usersError && <p>Błąd połączenia: {usersError}</p>}
                {!loadingUsers && !usersError && (
                    <SettingsUsers users={users} />     //Info o błędach i ładowaniu do przeniesienia wewnątrz samej listy
                )}
                {/* <SettingsUsers accounts={users} roleAffiliation={} passwordChange={} personalDataChange={}/> */}
            </div>
            <div className="RoleSettings">
                {loadingRoles && <p>Trwa pobieranie danych o rolach z bazy...</p>}
                {rolesError && <p>Błąd połączenia: {rolesError}</p>}
                {!loadingRoles && !rolesError && (
                    <SettingsRoles roles={roles} />
                )}
            </div>

        </div>
    )
}

export default Settings;
