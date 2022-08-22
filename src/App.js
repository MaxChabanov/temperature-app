import React, { useState } from "react";

function App() {
  const [tempValue, setTempValue] = useState(10);
  const [tempColor, setTempColor] = useState("cold");
  return (
    <div className="counter-container">
      <div className="header">
        <h1>Temperature Control</h1>
      </div>
      <p className="temp-counter">
        <p className="counter-number" id="counter-number">
          {tempValue}
          <span className="degree-symbol">°</span>
        </p>
      </p>

      <div className="room-container">
        <button
          className="btn-operation"
          onClick={() => setTempValue(tempValue + 1)}
        >
          +
        </button>
        <p id="room-name" className="room-name">
          Kitchen
        </p>
        <button
          className="btn-operation"
          onClick={() => setTempValue(tempValue - 1)}
        >
          -
        </button>
      </div>
    </div>
  );
}

export default App;
