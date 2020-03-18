import React from "react";
import styled from "styled-components";
import { ReactComponent as SeatSrc } from "../assets/seat-available.svg";
import Tippy from "@tippy.js/react";
import 'tippy.js/dist/tippy.css';
import { BookingContext } from "./BookingContext"
import { getRowName, getSeatNum, encodeSeatId } from "../helpers"

const Seats = ({ seatPlacement, rowIndex, price, seatStatus }) => {

  const { actions: { beginBookingProcess }} = React.useContext(BookingContext)
    
const rowName = getRowName(rowIndex)
const seatNum = getSeatNum(seatPlacement)
const seatId = encodeSeatId(rowIndex, seatPlacement)

const bool = seatStatus === "unavailable";
const scale =  bool ? "grayscale(100%)" : ""
  return (
    

      <Tippy content={`Row ${rowName}, Seat ${seatNum} - $${price}`}>
       <ImageContainer onClick={()=> {
         beginBookingProcess({ seatId, price })
       }}>

          <SeatSrc style ={{filter:scale}}/>

       </ImageContainer>
        
      </Tippy>


  );
};

export default Seats;


const ImageContainer = styled.button`
cursor: pointer;
border: 0px;
background: transparent; 
outline: none;

`
