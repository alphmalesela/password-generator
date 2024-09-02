import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [range, setRange] = useState(0)
  const [uppercase, setUppercase] = useState(false)
  const [lowercase, setLowercase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [password, setPassword] = useState("P4$5W0rD!")

  const [strength, setStrength] = useState(0)

  const onRangeChange = (e) => {
    setRange(e.target.value)
  }

  const onToggleUppercase = () => {
    setUppercase(!uppercase)
  }

  const onToggleLowercase = () => {
    setLowercase(!lowercase)
  }

  const onToggleNumbers = () => {
    setNumbers(!numbers)
  }

  const onToggleSymbols = () => {
    setSymbols(!symbols)
  }

  const generatePassword = () => {
    var chars = "";

    if (uppercase) {
      chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }

    if (lowercase) {
      chars += "abcdefghijklmnopqrstuvwxyz"
    }

    if (numbers) {
      chars += "0123456789";
    }

    if (symbols) {
      chars += "!@#$%^&*()"
    }

    var random = 0
    var pass = ""

    for (var i = 0; i < range; i++) {
      random = Math.floor(Math.random() * chars.length)
      pass += chars.substring(random, random + 1)
    }

    setPassword(pass)
  }

  const copyPasswordToClipboard = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(password);
      alert('Copied password to clipboard')
    }
  }

  return (
    <>
      <p>Password Generator</p>
      <div class="generator">
        <div class="password-wrap">
          <span id='password'>{password}</span>
          <span class="icon" onClick={() => copyPasswordToClipboard()}>copy</span>
        </div>
        <div className="card">
          <div>
            <label for="uppercase">Character Length</label>
            <input
              defaultValue={0}
              onChange={onRangeChange} type="range" id="length" name="length" min="0" max="20" />
          </div>
          <div>
            <label for="uppercase">Include Uppercase Letters</label>
            <input
              onChange={onToggleUppercase}
              type="checkbox"
              id="uppercase"
              name="uppercase" />
          </div>
          <div>
            <label for="lowercase">Include Lowercase Letters</label>
            <input
              onChange={onToggleLowercase}
              type="checkbox"
              id="lowercase"
              name="lowercase" />
          </div>
          <div>
            <label for="numbers">Include Numbers</label>
            <input
              onChange={onToggleNumbers}
              type="checkbox"
              id="numbers"
              name="numbers" />
          </div>
          <div>
            <label for="symbols">Include Symbols</label>
            <input
              onChange={onToggleSymbols}
              type="checkbox"
              id="symbols"
              name="symbols" />
          </div>
          <div>
          </div>
          <button onClick={() => generatePassword()}>
            GENERATE
          </button>
        </div>
      </div>
    </>
  )
}

export default App
