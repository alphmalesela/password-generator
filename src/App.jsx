import { useState } from 'react'
import './App.css'

function App() {

  const [range, setRange] = useState(0)
  const [uppercase, setUppercase] = useState(false)
  const [lowercase, setLowercase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [password, setPassword] = useState("P4$5W0rD!")

  const [strength, setStrength] = useState(0)
  const [strengthLabel, setStrengthLabel] = useState("")

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
    var localStrength = 0

    if (uppercase) {
      chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      localStrength += 5
    }

    if (lowercase) {
      chars += "abcdefghijklmnopqrstuvwxyz"
      localStrength += 5
    }

    if (numbers) {
      chars += "0123456789"
      localStrength += 5
    }

    if (symbols) {
      chars += "!@#$%^&*()"
      localStrength += 5
    }

    var random = 0
    var pass = ""

    for (var i = 0; i < range; i++) {
      random = Math.floor(Math.random() * chars.length)
      pass += chars.substring(random, random + 1)
    }

    const totalStrength = Number(range) + Number(localStrength)
    console.log("range ", range)
    console.log("localStrength ", localStrength)
    console.log("totalStrength ", totalStrength)

    const percentage = (totalStrength / 40) * 100
    console.log("percentage  ", percentage)
    setPassword(pass)
    percentageStrength(percentage)
  }

  const percentageStrength = (strength) => {
    if (strength > 74) {
      setStrength(3)
      setStrengthLabel("STRONG")
      return

    }
    if (strength > 49) {
      setStrength(2)
      setStrengthLabel("MEDIUM")
      return
    }
    if (strength > 24) {
      setStrength(1)
      setStrengthLabel("WEAK")
      return
    }

    setStrength(0)
    setStrengthLabel("TOO WEAK!")

  }

  const copyPasswordToClipboard = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(password);
      alert('Copied password to clipboard')
    }
  }

  return (
    <>
      <p class="pass-gen-grey">Password Generator</p>
      <div class="card password-wrap">
        <div class="card-body">
          <span id='password'>{password}</span>
          <span class="icon" onClick={() => copyPasswordToClipboard()}>copy</span>
        </div>
      </div>
      <ul class="list-group password-wrap">
        <li class="list-group-item character-length">
          <label for="uppercase">Character Length</label>
          <label class="range">{range}</label>
        </li>
        <li class="list-group-item">
          <input
            class="range-input"
            defaultValue={0}
            onChange={onRangeChange} type="range" id="length" name="length" min="0" max="20" />
        </li>
        <li class="list-group-item">
          <input
            class="form-check-input me-1"
            onChange={onToggleUppercase}
            type="checkbox"
            id="uppercase"
            name="uppercase" />
          <label class="form-check-label" for="uppercase">Include Uppercase Letters</label>
        </li>
        <li class="list-group-item">
          <input
            class="form-check-input me-1"
            onChange={onToggleLowercase}
            type="checkbox"
            id="lowercase"
            name="lowercase" />
          <label class="form-check-label" for="lowercase">Include Lowercase Letters</label>
        </li>
        <li class="list-group-item">
          <input
            class="form-check-input me-1"
            onChange={onToggleNumbers}
            type="checkbox"
            id="numbers"
            name="numbers" />
          <label class="form-check-label" for="numbers">Include Numbers</label>
        </li>
        <li class="list-group-item">
          <input
            class="form-check-input me-1"
            onChange={onToggleSymbols}
            type="checkbox"
            id="symbols"
            name="symbols" />
          <label class="form-check-label" for="symbols">Include Symbols</label>
        </li>
        <li class="list-group-item">
          <div class="card strength-card">
            <div class="card-body strength-wrap">
              <span class="strength-label">STRENGTH</span>
              <span class="strength">{strengthLabel} {strength}</span>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <button
            type='button'
            class="btn btn-success btn-gen"
            onClick={() => generatePassword()}>
            GENERATE
          </button>
        </li>
      </ul>
    </>
  )
}

export default App
