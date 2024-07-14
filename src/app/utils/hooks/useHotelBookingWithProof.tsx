"use client";

import { useContext } from "react";
import { HotelBookingWithProofGeneratedContext } from "../../context/context";


export const useHotelBookingWithProof = () => {
    return useContext(HotelBookingWithProofGeneratedContext);
}