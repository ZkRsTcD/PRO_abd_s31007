import React, { useEffect, useState } from 'react'
import Recipes from '../recipes/components/Recipes'
import Settings from '../settings/components/Settings'
import Production from '../production/components/Production'
import Alarms from '../alarms/components/Alarms'
import './App.css'


const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<string>();

  return (
    <div className = "wholeAppContainer">
      <aside>
        <h2>PROTOTYP</h2>
        <button onClick={() => setCurrentModule('liveStatus')}>LIVE STATUS</button>
        <button onClick={() => setCurrentModule('production')} style={{color: 'aliceblue'}}>PRODUCTION</button>
        <button onClick={() => setCurrentModule('stoppage')}>STOPPAGE</button>
        <button onClick={() => setCurrentModule('scrap')}>SCRAP</button>
        <button onClick={() => setCurrentModule('quality')}>QUALITY</button>
        <button onClick={() => setCurrentModule('recipes')} style={{color: 'aliceblue'}}>RECIPES</button>
        <button onClick={() => setCurrentModule('alarms')} style={{color: 'aliceblue'}}>ALARMS</button>
        <button onClick={() => setCurrentModule('settings')} style={{color: 'aliceblue'}}>SETTINGS</button>
        {/* To be changed for database menu version */}
        <div className='languageSelection'>
          <button>PL</button>
          <button>ENG</button>
        </div>
      </aside>

      <main>

        {currentModule === 'production' && <Production />}
        {currentModule === 'recipes' && <Recipes />}
        {currentModule === 'alarms' && <Alarms />}
        {currentModule === 'settings' && <Settings />}
      </main>

    </div>
  )
}

export default App
