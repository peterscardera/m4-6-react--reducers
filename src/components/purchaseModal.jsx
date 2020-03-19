import React, { useEffect } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BookingContext } from "./BookingContext";
import { SeatContext } from "./SeatContext";
import { decodeSeatId } from "../helpers";

import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaCreditCard } from "react-icons/fa";

import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";

export const PurchasedModal = () => {

  const {
    status,
    error,
    selectedSeatId,
    price,
    actions: { cancellation, purchaseAttempt, purchaseSuccess, serverFailure}
  } = React.useContext(BookingContext);

  console.log(status, error);
  const { rowName, seatNum } = decodeSeatId(selectedSeatId);

  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");

  //console.log(creditCard, expiration);
  //---------------------------------RENDER---------------------------------

  return (
    <Dialog open={selectedSeatId !== null} aria-labelledby="form-dialog-title">
      <TopRow>
        <DialogTitle id="form-dialog-title">Purchase Ticket</DialogTitle>
        <StyledButton
          onClick={() => {
            cancellation();
          }}
        >
          <IoIosCloseCircleOutline
            color={"gray"}
            size={"3em"}
          ></IoIosCloseCircleOutline>
        </StyledButton>
      </TopRow>

      <DialogContent>
        <DialogContentText>
          You are purchasing <strong>1</strong> ticket for the price of ${price}
        </DialogContentText>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Row</TableCell>
              <TableCell align="center">Seat</TableCell>
              <TableCell align="center">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{rowName}</TableCell>
              <TableCell align="center">{seatNum}</TableCell>
              <TableCell align="center">{price}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>

      <BottomRow
        onSubmit={e => {
          e.preventDefault();
          //console.log("cliked buy");
          purchaseAttempt();
          //console.log(status)
          fetch("/api/book-seat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              seatId: selectedSeatId,
              creditCard,
              expiration
            })
          })
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                purchaseSuccess();
                // console.log(data);
              } else {
                serverFailure(data.message)
                
              }
            }).catch(error=> {
              console.error(error)
            })
        }}
      >
        <FormControl variant="outlined">
          <InputLabel htmlFor="credit">
            <FaCreditCard /> CC
          </InputLabel>
          <OutlinedInput
            style={{ flex: 2 }}
            id="credit"
            label="credit"
            value={creditCard}
            onChange={e => {
              setCreditCard(e.currentTarget.value);
            }}
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="expiration">MM/YY</InputLabel>
          <OutlinedInput
            style={{ flex: 1 }}
            id="expiration"
            label="expiration"
            value={expiration}
            onChange={e => {
              setExpiration(e.currentTarget.value);
            }}
          />
        </FormControl>
        <Button type="submit" color="primary">
          {status === "awaiting" ? (<CircularProgress/>) : "Purchase"}
          
        </Button>
      </BottomRow>
      <StyledStatus> {status === "something went wrong" ? "Error on our end..." : ""} 
      {error === "Please provide credit card information!" ? "Please provide credit card information!" : ""} </StyledStatus>
    </Dialog>
  );
};

const BottomRow = styled.form`
  display: flex;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  cursor: pointer;
  border: 0px;
  background: transparent;
  outline: none;
  left: 10%;
  align-items: end;
`;


const StyledStatus = styled.div`
margin-top: 10px;
text-alighn: center;
color: red;
`