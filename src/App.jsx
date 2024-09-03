import { useState } from 'react'
import './App.css'
import IconCopy from './assets/images/icon-copy.svg'
import IconArrowRight from './assets/images/icon-arrow-right.svg'

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
      <p className="pass-gen-grey">Password Generator</p>
      <div className="card password-wrap">
        <div className="card-body">
          <span className={password === 'P4$5W0rD!' ? 'password-placeholder' : 'password'}>{password}</span>
          <span className="icon" onClick={() => copyPasswordToClipboard()}>
            <img src={IconCopy} alt="copy" />
          </span>
        </div>
      </div>
      <ul className="list-group password-wrap">
        <li className="list-group-item character-length">
          <label for="uppercase">Character Length</label>
          <label className="range">{range}</label>
        </li>
        <li className="list-group-item">
          <input
            className="range-input"
            defaultValue={0}
            onChange={onRangeChange} type="range" id="length" name="length" min="0" max="20" />
        </li>
        <li className="list-group-item">
          <input
            className="form-check-input me-4 float-start"
            onChange={onToggleUppercase}
            type="checkbox"
            id="uppercase"
            name="uppercase" />
          <label className="form-check-label float-start" for="uppercase">Include Uppercase Letters</label>
        </li>
        <li className="list-group-item">
          <input
            className="form-check-input me-4 float-start"
            onChange={onToggleLowercase}
            type="checkbox"
            id="lowercase"
            name="lowercase" />
          <label className="form-check-label float-start" for="lowercase">Include Lowercase Letters</label>
        </li>
        <li className="list-group-item">
          <input
            className="form-check-input me-4 float-start"
            onChange={onToggleNumbers}
            type="checkbox"
            id="numbers"
            name="numbers" />
          <label className="form-check-label float-start" for="numbers">Include Numbers</label>
        </li>
        <li className="list-group-item">
          <input
            className="form-check-input me-4 float-start"
            onChange={onToggleSymbols}
            type="checkbox"
            id="symbols"
            name="symbols" />
          <label className="form-check-label float-start" for="symbols">Include Symbols</label>
        </li>
        <li className="list-group-item">
          <div className="card strength-card">
            <div className="card-body strength-wrap">
              <span className="strength-heading">STRENGTH</span>
              <span className="strength">
                <span className="label">{strengthLabel}</span>
                {(strength === 0 && password === "P4$5W0rD!") &&
                  <>
                    <button type="button" className="btn btn-outline-light btn-placeholder"></button>
                    <button type="button" className="btn btn-outline-light btn-placeholder"></button>
                    <button type="button" className="btn btn-outline-light btn-placeholder"></button>
                    <button type="button" className="btn btn-outline-light btn-placeholder"></button>
                  </>
                }
                {(strength === 0 && password !== "P4$5W0rD!") &&
                  <>
                    <button type="button" className="btn btn-outline-danger btn-0"></button>
                    <button type="button" className="btn btn-outline-light btn-placeholder"></button>
                    <button type="button" className="btn btn-outline-light btn-placeholder"></button>
                    <button type="button" className="btn btn-outline-light btn-placeholder"></button>
                  </>
                }
                {(strength === 1) &&
                  <>
                    <button type="button" className="btn btn-outline-warning btn-1"></button>
                    <button type="button" className="btn btn-outline-warning btn-1"></button>
                    <button type="button" className="btn btn-outline-light btn-placeholder"></button>
                    <button type="button" className="btn btn-outline-light btn-placeholder"></button>
                  </>
                }
                {(strength === 2) &&
                  <>
                    <button type="button" className="btn btn-outline-warning btn-2"></button>
                    <button type="button" className="btn btn-outline-warning btn-2"></button>
                    <button type="button" className="btn btn-outline-warning btn-2"></button>
                    <button type="button" className="btn btn-outline-light btn-placeholder"></button>
                  </>
                }
                {(strength === 3) &&
                  <>
                    <button type="button" className="btn btn-outline-success btn-3"></button>
                    <button type="button" className="btn btn-outline-success btn-3"></button>
                    <button type="button" className="btn btn-outline-success btn-3"></button>
                    <button type="button" className="btn btn-outline-success btn-3"></button>
                  </>
                }
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <button
            type='button'
            className="btn btn-success btn-gen"
            onClick={() => generatePassword()}>
            GENERATE
            <span className='m-2'><img src={IconArrowRight} alt="" /></span>
          </button>
        </li>
      </ul>
    </>
  )
}

export default App
