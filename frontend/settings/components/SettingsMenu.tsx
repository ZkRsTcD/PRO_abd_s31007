import React from "react";
import type { Menu } from '../typesSettings'

interface MenuTableProps {
    menu: Menu[];
    permittedMenuIds: number[];
    onSelect: (roleId: number) => void;
    selectedRoleId: number|null;
}

const SettingsMenu: React.FC<MenuTableProps> = ({ menu, permittedMenuIds, onSelect, selectedRoleId }) => {

    return (
        <table>
            <tbody>
                {menu.length === 0 ? (
                    <tr>
                        <td>Brak rekordów w tablicy Menu</td>
                    </tr>
                ) : (
                    menu.map(m => (
                        <tr key={m.id}>
                            <td>{m.title}</td>
                            <td><input type="checkbox" name="permitted" disabled={selectedRoleId === null} value={m.id} checked={permittedMenuIds.includes(m.id)} onChange={() => onSelect(m.id)}></input></td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )

}

export default SettingsMenu;
