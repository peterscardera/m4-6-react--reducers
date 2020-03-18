import React, { useContext, useEffect } from "react";
import { SeatContext } from "./SeatContext";
import TicketWidget from "./TicketWidget";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import { BookingContext } from "./BookingContext"
import { PurchasedModal } from "./purchaseModal"

function App() {
  const {
    
    actions: { receiveSeatInfoFromServer }
  } = useContext(SeatContext);

  

  useEffect(() => {
    fetch("/api/seat-availability")
      .then(res => res.json())
      .then(data => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      <StyledDiv>
        <TicketWidget />
        <PurchasedModal />
      </StyledDiv>
     
    </>
  );
}

export default App;

const StyledDiv = styled.div`
 
  display: flex;
  justify-content: center;
`;
