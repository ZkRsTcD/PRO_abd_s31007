import React from "react";
import type { Menu } from '../typesSettings'

interface MenuTableProps {
    menu: Menu[];
    permittedMenuIds: number[];
}

const SettingsMenu: React.FC<MenuTableProps> = ({ menu, permittedMenuIds }) => {

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
                            <td><input type="checkbox" name="permitted" value={m.id} checked={permittedMenuIds.includes(m.id)}></input></td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )

}

export default SettingsMenu;
