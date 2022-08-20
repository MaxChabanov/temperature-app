import React from "react";

function App() {
  return (
    <div className="counter-container">
      <p className="temp-counter">
        <p className="counter-number" id="counter-number">
          26
          <span className="degree-symbol">°</span>
        </p>
      </p>

      <div className="room-container">
        <p id="room-name" className="room-name">
          Kitchen
        </p>
      </div>
    </div>
  );
}

export default App;
