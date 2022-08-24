import React, { useState } from "react";

function App() {
  const [tempValue, setTempValue] = useState(23);
  const [currentUnits, setUnits] = useState("C");

  const MIN_COLOR_C = 12;
  const MIN_TEMP_C = 0;
  const MAX_COLOR_C = 36;
  const MAX_TEMP_C = 40;

  const MIN_COLOR_F = 12;
  const MIN_TEMP_F = 0;
  const MAX_COLOR_F = 97;
  const MAX_TEMP_F = 104;

  function setTempColor(color) {
    document.documentElement.style.setProperty(
      "--bg-color",
      `radial-gradient(circle, hsl(${color}, 100%, 40%) 0%, hsl(263, 64%, 19%) 70%)`
    );
  }

  function increaseTemp() {
    let newTemp = tempValue + 1;

    let minTemp = MIN_TEMP_C;
    let minTempColor = MIN_COLOR_C;
    let maxTemp = MAX_TEMP_C;
    let maxTempColor = MAX_COLOR_C;

    let newColor = newTemp * -10;

    console.log(currentUnits);
    if (currentUnits === "F") {
      minTemp = MIN_TEMP_F;
      minTempColor = MIN_COLOR_F;
      maxTemp = MAX_TEMP_F;
      maxTempColor = MAX_COLOR_F;

      newColor = Math.round(((tempValue - 32) * 5) / 9) * -10;
    }

    setTempColor(newColor);

    if (tempValue >= maxTempColor) {
      newColor = 36 * -10;

      setTempColor(newColor);

      if (tempValue >= maxTemp) {
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

  function changeUnits() {
    if (currentUnits === "C") {
      setUnits("F");
      setTempValue(Math.round((tempValue * 9) / 5 + 32));
    }
    if (currentUnits === "F") {
      setUnits("C");
      setTempValue(Math.round(((tempValue - 32) * 5) / 9));
    }
  }
  return (
    <div className="counter-container">
      <div className="header">
        <h1>Temperature Control</h1>
        <button className="change-unit-btn" onClick={() => changeUnits()}>
          {currentUnits}
        </button>
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
