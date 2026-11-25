import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, type Language, type Translations } from './translations'

const STORAGE_KEY = 'app_language';

interface LanguageContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
    locale: string;
}

interface LanguageProviderProps {
    children: React.ReactNode;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

function getInitialLanguage(): Language {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'pl' || saved === 'en') {
            return saved;
        }
    } catch {

    }
    return 'pl';
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {

    const [language, setLanguageState] = useState<Language>(getInitialLanguage);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang)
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch {

        }
    }, []);

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const value: LanguageContextProps = {
        language,
        setLanguage,
        t: translations[language],
        locale: language === 'pl' ? 'pl-PL' : 'en-GB'
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );

};

export function useLanguage(): LanguageContextProps {
    const context = useContext(LanguageContext);
    if(!context) {
        throw new Error('Błąd i18n');
    }
    return context
}
