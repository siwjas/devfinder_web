import React, { useState, useEffect } from 'react'
import radar from '../src/img/radar.png'

import './global.css'
import './Sidebar.css'
import './Main.css'
import './App.css'
import api from './services/api'
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'


function App() {
  const [devs, setDevs] = useState([])

  useEffect(() => {
    async function loadDevs() {
     const response = await api.get('/devs')

     setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)

    setDevs([...devs, response.data])
  }

  return (
    <div id="app">
      <aside>
        <header>
          <img src={ radar } alt={"DevRadar"}/> 
          
          <div className="form_title">
            <strong>Cadastre-se</strong> 
          </div>     
        </header>      
      
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>

          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}

        </ul>
      </main>
    </div>
  )
}

export default App
