import { createContext } from "react";
import { GeneratedProofResponse } from "../models/zk-proof-models";

export type BookingWithProofGeneratedProps = {
    bookingProofData?: GeneratedProofResponse;
    setBookingProofData?: (data: GeneratedProofResponse) => void,
}

export const HotelBookingWithProofGeneratedContext = createContext<BookingWithProofGeneratedProps>({});