import React from "react";
import ReactDOM from "react-dom";
import { SeatProvider } from "./components/SeatContext";
import App from "./components/App";
import { BookingProvider } from "./components/BookingContext";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BookingProvider>
    <SeatProvider>
      <App />
    </SeatProvider>
  </BookingProvider>,

  rootElement
);
