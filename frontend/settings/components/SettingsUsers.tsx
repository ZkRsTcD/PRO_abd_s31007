import React from "react";
import type { User } from '../typesSettings'

interface UsersTableProps {
    users: User[];
    // roleAffiliation: (accountId: number) => void
    // passwordChange: (accountId: number) => void
    // personalDataChange: (accountId: number) => void
}

const SettingsUsers: React.FC<UsersTableProps> = ({ users/*, roleAffiliation, passwordChange, personalDataChange */}) => {

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Nazwisko</th>
                    <th>Hasło</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.length === 0 ? (
                    <tr>
                        <td>Brak rekordów w tabeli Users</td>
                    </tr>
                ) : (
                    users.map(user => (
                        <tr key={user.id}>
                            <td><input type="checkbox" name="assigned" value={user.id}></input></td>
                            <td>{user.id}</td>
                            <td>{user.fname} {user.sname}</td>
                            <td>TEMPORARY PASSWORD FIELD TEXT</td>
                            <td></td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )

}

export default SettingsUsers;
