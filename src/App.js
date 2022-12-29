import React, { useState } from "react";

function App() {
  const [tempValue, setTempValue] = useState(() => {
    const savedTemp = localStorage.getItem("tempValue");
    const initialValue = JSON.parse(savedTemp);

    if (initialValue >= 0 && initialValue) {
      return initialValue;
    } else {
      return 23;
    }
  });

  const [currentUnits, setUnits] = useState(() => {
    const savedUnits = JSON.parse(localStorage.getItem("units"));

    if (savedUnits === "F") {
      return savedUnits;
    } else {
      return "C";
    }
  });

  const [currentMode, setMode] = useState("color");
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
      `radial-gradient(circle, hsl(${color}) 0%, hsl(263, 64%, 19%) 70%)`
    );
    localStorage.setItem(
      "colorValue",
      `radial-gradient(circle, hsl(${color}) 0%, hsl(263, 64%, 19%) 70%)`
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
    setTempColor(`${newColor}, 100%, 40%`);

    if (tempValue >= maxTempColor) {
      newColor = 36 * -10;

      setTempColor(`${newColor}, 100%, 40%`);

      if (tempValue >= maxTemp) {
        newTemp = tempValue;
        setTempColor(`${newColor}, 100%, 40%`);
      }
    }

    if (newTemp <= minTempColor) {
      setTempColor(`-120, 100%, 40%`);
    }
    if (tempValue === minTemp + 1) {
      setTitle("Temperature Control");
    }

    setTempValue(newTemp);
    if (currentMode === "scale") {
      setTempColor(`308, 45%, 44%`);
      localStorage.setItem("tempValue", JSON.stringify(`308, 45%, 44%`));
    }
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
    setTempColor(`${newColor}, 100%, 40%`);

    if (tempValue <= minTempColor) {
      newColor = 12 * -10;

      setTempColor(`${newColor}, 100%, 40%`);

      if (tempValue <= minTemp) {
        newTemp = tempValue;
      }
    }

    if (tempValue >= maxTempColor) {
      setTempColor(`-360, 100%, 40%`);
    }

    if (tempValue === maxTemp - 1) {
      setTitle("Temperature Control");
    }

    if (currentMode === "scale") {
      setTempColor(`308, 45%, 44%`);
      localStorage.setItem("tempValue", JSON.stringify(`308, 45%, 44%`));
    }
    setTempValue(newTemp);
    localStorage.setItem("tempValue", JSON.stringify(newTemp));
  }

  function changeUnits() {
    if (currentUnits === "C") {
      const newUnits = "F";
      const newTemp = Math.round((tempValue * 9) / 5 + 32);

      setUnits(newUnits);
      setTempValue(newTemp);
      localStorage.setItem("tempValue", JSON.stringify(newTemp));
      localStorage.setItem("units", JSON.stringify(newUnits));
    }
    if (currentUnits === "F") {
      const newUnits = "C";
      const newTemp = Math.round(((tempValue - 32) * 5) / 9);

      setUnits(newUnits);
      setTempValue(newTemp);
      localStorage.setItem("tempValue", JSON.stringify(newTemp));
      localStorage.setItem("units", JSON.stringify(newUnits));
    }
  }

  function changeMode() {
    if (currentMode === "color") {
      setTempColor(`308, 45%, 44%`);
      setMode("scale");
    } else {
      if (currentUnits === "F") {
        setTempColor(
          `${Math.round(((tempValue - 32) * 5) / 9) * -10}, 100%, 40%`
        );
      } else {
        setTempColor(`${tempValue * -10}, 100%, 40%`);
      }
      setMode("color");
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
        <button className="mode-btn" onClick={() => changeMode()}>
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
