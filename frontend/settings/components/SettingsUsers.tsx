import React from "react";
import type { Account } from '../typesSettings'

interface UsersTableProps {
    accounts: Account[];
    roleAffiliation: (accountId: number) => void
    passwordChange: (accountId: number) => void
    personalDataChange: (accountId: number) => void
}

const SettingsUsers: React.FC<UsersTableProps> = ({ accounts, roleAffiliation, passwordChange, personalDataChange }) => {

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

            </tbody>
        </table>
    )

}

export default SettingsUsers;
