import React, { createContext, useReducer } from "react";

export const SeatContext = createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0
};
//action will update the state, its an object that could have a type and we are using swicth statements
//define different case for differenct code we want to execute

//state is the current state. Action will update the state
const reducer = (state, action) => {


  switch (action.type) {
   
    case "receive-seat-info-from-server": {
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow
      };
    }
  }
};

export const SeatProvider = ({ children }) => {
  //the second (optional) aregument "iniitialState" is the starting state which will be passed in
  // passed into state in const reducer = (state,action) the first time it runs
  
  const [state, dispatch] = useReducer(reducer, initialState);
  //the dispatch function (we could name it whatever we want but it is a function that we will call to dispatch the action in the reducer)
  const receiveSeatInfoFromServer = data => {
     
    dispatch({
      type: "receive-seat-info-from-server",
      ...data
    });
    
  };

  return (

    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer // best to pass down the function to who ever calls the context rather than the direct function
        }
      }}
    >
      {children}
    </SeatContext.Provider>

  );
};
