import React from "react";
import type { Role } from '../typesSettings'

interface RolesTableProps {
    roles: Role[];
    selectedRoleId: number | null;
    onSelect: (roleId: number) => void;
}

const SettingsRoles: React.FC<RolesTableProps> = ({ roles, selectedRoleId, onSelect }) => {

    //console.log(roles);

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Opis</th>
                    <th>Przypisani</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {roles.length === 0 ? (
                    <tr>
                        <td>Brak rekordów w tabeli Roles</td>
                    </tr>
                ) : (
                    roles.map(role => (
                        <tr key={role.id}>
                            <td><input type="radio" name="selectedRole" value={role.id} checked={selectedRoleId === role.id} onChange={() => onSelect(role.id)}></input></td>
                            <td>{role.id}</td>
                            <td>{role.name}</td>
                            <td>{role.number_of_users}</td>
                            <td></td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )

}

export default SettingsRoles
