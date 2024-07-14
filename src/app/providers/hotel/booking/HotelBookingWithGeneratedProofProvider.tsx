
import { HotelBookingWithProofGeneratedContext } from "@/src/app/context/context";
import { GeneratedProofResponse } from "@/src/app/models/zk-proof-models";
import { useState } from "react";

export default function HotelBookingWithGeneratedProofContextProvider({ children }: { children: React.ReactNode }) {

    const [generatedProof, setGeneratedProof] = useState<GeneratedProofResponse>();


    return (
        <HotelBookingWithProofGeneratedContext.Provider
            value={
                {
                    bookingProofData: generatedProof,
                    setBookingProofData: setGeneratedProof,
                }}>
            {children}
        </HotelBookingWithProofGeneratedContext.Provider>
    );
}