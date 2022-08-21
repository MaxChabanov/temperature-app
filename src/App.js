import React from "react";

function App() {
  return (
    <div className="counter-container">
      <div className="header">
        <h1>Temperature Control</h1>
      </div>
      <p className="temp-counter">
        <p className="counter-number" id="counter-number">
          26
          <span className="degree-symbol">°</span>
        </p>
      </p>

      <div className="room-container">
        <button className="btn-operation">+</button>
        <p id="room-name" className="room-name">
          Kitchen
        </p>
        <button className="btn-operation">-</button>
      </div>
    </div>
  );
}

export default App;
