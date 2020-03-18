import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

export const BookingContext = React.createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "begin-booking-process": {
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.seatId,
        price: action.price
      };
    }
    case "cancel": {
      return {
        ...state,
        status: "idle",
        selectedSeatId: null,
        price: null
      };
    }
    //to move from begin-booking-process case 
    case "purchase-attempt": {
      return {
        ...state,
        status: "awaiting",
        error: null
      }
    }
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = React.useCallback(
    data => {
      dispatch({ type: "begin-booking-process", ...data });
    },
    [dispatch]
  );

  const cancellation = React.useCallback(() => {
    dispatch({ type: "cancel" });
  }, [dispatch]);

  const purchaseAttempt = React.useCallback(()=> {
    dispatch({type: "purchase-attempt"})
  },[dispatch])

  

  return (
    <BookingContext.Provider
      value={{ ...state, actions: { beginBookingProcess, cancellation, purchaseAttempt } }}
    >
      {children}
    </BookingContext.Provider>
  );
};
