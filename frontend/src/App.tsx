import React, { useEffect, useState } from 'react'
import Recipes from '../recipes/components/Recipes'
import Settings from '../settings/components/Settings'
import Production from '../production/components/Production'
import Alarms from '../alarms/components/Alarms'
import LiveStatus from '../liveStatus/components/LiveStatus'
import { LanguageProvider, useLanguage } from '../i18n/LanguageContext'
import './App.css'


const AppContent: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<string>();

  const { language, setLanguage, t } = useLanguage();

  return (
    <div className = "wholeAppContainer">
      <aside>
        <h2>PROTOTYP</h2>
        <button onClick={() => setCurrentModule('liveStatus')} style={{color: 'aliceblue'}}>{t.sidebar.livestatus}</button>
        <button onClick={() => setCurrentModule('production')} style={{color: 'aliceblue'}}>{t.sidebar.production}</button>
        <button onClick={() => setCurrentModule('stoppage')}>{t.sidebar.stoppage}</button>
        <button onClick={() => setCurrentModule('scrap')}>{t.sidebar.scrap}</button>
        <button onClick={() => setCurrentModule('quality')} style={{color: 'aliceblue'}}>{t.sidebar.quality}</button>
        <button onClick={() => setCurrentModule('recipes')} style={{color: 'aliceblue'}}>{t.sidebar.recipes}</button>
        <button onClick={() => setCurrentModule('alarms')} style={{color: 'aliceblue'}}>{t.sidebar.alarms}</button>
        <button onClick={() => setCurrentModule('settings')} style={{color: 'aliceblue'}}>{t.sidebar.settings}</button>
        {/* To be changed for database menu version */}
        <div className='languageSwitcher'>
          <button onClick={() => setLanguage('pl')} style={{color: 'aliceblue'}}>PL</button>
          <button onClick={() => setLanguage('en')} style={{color: 'aliceblue'}}>ENG</button>
        </div>
      </aside>

      <main>
        {currentModule === 'liveStatus' && <LiveStatus />}
        {currentModule === 'production' && <Production />}

        {currentModule === 'recipes' && <Recipes />}
        {currentModule === 'alarms' && <Alarms />}
        {currentModule === 'settings' && <Settings />}
      </main>

    </div>
  )
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
