import React from "react";

interface PasswordSettingsProps {
    newPassword: string;
    onSubmit: (roleId: number) => void;
}

const PasswordSettings: React.FC<PasswordSettingsProps> = ({ newPassword, onSubmit }) => {
    return (
        <div className="textAndSubmitArea">
            <input type="text" placeholder="Wpisz nowe hasło"></input>
            <input type="text" placeholder="Wpisz ponownie nowe hasło"></input>
            <button onClick={() => onSubmit(4)}>Zmień swoje hasło</button>
        </div>
    )

}

export default PasswordSettings
