import React, { useState } from "react";

function App() {
  const [tempValue, setTempValue] = useState(23);
  const [currentUnits, setUnits] = useState("C");

  function setTempColor(color) {
    document.documentElement.style.setProperty(
      "--bg-color",
      `radial-gradient(circle, hsl(${color}, 100%, 40%) 0%, hsl(263, 64%, 19%) 70%)`
    );
  }

  function increaseTemp() {
    let newTemp = tempValue + 1;
    let newColor = newTemp * -10;
    setTempColor(newColor);

    if (tempValue >= 36) {
      newColor = 36 * -10;

      setTempColor(newColor);

      if (tempValue >= 40) {
        newTemp = tempValue;
        setTempColor(newColor);
      }
    }

    if (newTemp <= 12) {
      setTempColor(-120);
    }

    setTempValue(newTemp);
  }
  function decreaseTemp() {
    let newTemp = tempValue - 1;
    let newColor = newTemp * -10;
    setTempColor(newColor);

    if (tempValue <= 12) {
      newColor = 12 * -10;

      setTempColor(newColor);

      if (tempValue <= 0) {
        newTemp = tempValue;
      }
    }

    if (tempValue >= 36) {
      setTempColor(-360);
    }

    setTempValue(newTemp);
  }
  return (
    <div className="counter-container">
      <div className="header">
        <h1>Temperature Control</h1>
        <button className="change-unit-btn">{currentUnits}</button>
      </div>
      <div className="temp-counter">
        <p className="counter-number" id="counter-number">
          {tempValue}
          <span className="degree-symbol">°</span>
        </p>
      </div>

      <div className="room-container">
        <button className="btn-operation" onClick={() => increaseTemp()}>
          +
        </button>
        <p id="room-name" className="room-name">
          Kitchen
        </p>
        <button className="btn-operation" onClick={() => decreaseTemp()}>
          -
        </button>
      </div>
    </div>
  );
}

export default App;
