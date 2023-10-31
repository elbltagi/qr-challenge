import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import logo from "./assets/logo-qr-generator.svg"
import back from "./assets/bg-illustration.svg"
import { useNavigate } from 'react-router-dom'

function App() {
  const Navigate = useNavigate()
  const [url, setUrl] = useState("")

  return (
    <div className="App">
      <div className='content'>
        <img src={logo} />
        <div className="url-text">
          <input type='text' onChange={(item) => setUrl(item.target.value)} placeholder='Enter an url' />
          <button onClick={() => Navigate(`/${encodeURIComponent(url)}`)}>QR code</button>
        </div>
      </div>

    </div>
  )
}

export default App
