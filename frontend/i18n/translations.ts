export type Language = 'pl' | 'en';

export const translations = {
    pl: {
        sidebar: {
            livestatus: 'STATUS MASZYN',
            production: 'PRODUKCJA',
            stoppage: 'PRZESTOJE !!!!',
            scrap: 'ODPADKI !!!!',
            quality: 'KONTROLA JAKOŚCI !!!!',
            recipes: 'RECEPTURY',
            alarms: 'ALARMY',
            settings: 'USTAWIENIA'
        },
        common: {
            search: 'Szukaj',
            loading: 'Trwa pobieranie danych z bazy...',

        },

    },
    en: {
        sidebar: {
            livestatus: 'LIVE STATUS',
            production: 'PRODUCTION',
            stoppage: 'STOPPAGE',
            scrap: 'SCRAP',
            quality: 'QUALITY',
            recipes: 'RECIPES',
            alarms: 'ALARMS',
            settings: 'SETTINGS'
        },
        common: {
            search: 'Search',
            loading: 'Loading data from the database...',
            
        },

    }
} as const;

export type Translations = typeof translations.pl;
