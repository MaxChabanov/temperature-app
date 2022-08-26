import React, { useState } from "react";

function App() {
  const [tempValue, setTempValue] = useState(() => {
    const savedTemp = localStorage.getItem("tempValue");
    const initialValue = JSON.parse(savedTemp);
    return initialValue || 23;
  });

  const [currentUnits, setUnits] = useState("C");
  const [currentTitle, setTitle] = useState("Temperature Control");

  const MIN_COLOR_C = 12;
  const MIN_TEMP_C = 0;
  const MAX_COLOR_C = 36;
  const MAX_TEMP_C = 40;

  const MIN_COLOR_F = 54;
  const MIN_TEMP_F = 32;
  const MAX_COLOR_F = 97;
  const MAX_TEMP_F = 104;

  document.documentElement.style.setProperty(
    "--bg-color",
    localStorage.getItem("colorValue")
  );

  function setTempColor(color) {
    document.documentElement.style.setProperty(
      "--bg-color",
      `radial-gradient(circle, hsl(${color}, 100%, 40%) 0%, hsl(263, 64%, 19%) 70%)`
    );
    localStorage.setItem(
      "colorValue",
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
        setTitle("Good luck burning to death");
      }
    }

    if (newTemp <= minTempColor) {
      setTempColor(-120);
    }
    if (tempValue === minTemp + 1) {
      setTitle("Temperature Control");
    }

    setTempValue(newTemp);
    localStorage.setItem("tempValue", JSON.stringify(newTemp));
  }

  function decreaseTemp() {
    let newTemp = tempValue - 1;

    let minTemp = MIN_TEMP_C;
    let minTempColor = MIN_COLOR_C;
    let maxTemp = MAX_TEMP_C;
    let maxTempColor = MAX_COLOR_C;

    let newColor = newTemp * -10;

    if (currentUnits === "F") {
      minTemp = MIN_TEMP_F;
      minTempColor = MIN_COLOR_F;
      maxTemp = MAX_TEMP_F;
      maxTempColor = MAX_COLOR_F;

      newColor = Math.round(((tempValue - 32) * 5) / 9) * -10;
    }
    setTempColor(newColor);

    if (tempValue <= minTempColor) {
      newColor = 12 * -10;

      setTempColor(newColor);

      if (tempValue <= minTemp) {
        newTemp = tempValue;
        setTitle("Good luck freezing to death");
      }
    }

    if (tempValue >= maxTempColor) {
      setTempColor(-360);
    }

    if (tempValue === maxTemp - 1) {
      setTitle("Temperature Control");
    }

    setTempValue(newTemp);
    localStorage.setItem("tempValue", JSON.stringify(newTemp));
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
        <h1>{currentTitle}</h1>
      </div>

      <div className="space-filler"></div>
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
        <div className="room-controls-container">
          <button className="room-control-btn">←</button>
          <button className="room-control-btn">→</button>
        </div>
        <button className="btn-operation" onClick={() => decreaseTemp()}>
          -
        </button>
      </div>
      <div className="controls-container">
        <button className="mode-btn" onClick={() => changeUnits()}>
          M
        </button>

        <button className="change-units-btn" onClick={() => changeUnits()}>
          {currentUnits}
        </button>
      </div>
    </div>
  );
}

export default App;
