'use client';

import { useHotelBookingWithProof } from "@/src/app/utils/hooks/useHotelBookingWithProof";
import { verifyZkProofSC } from "@/src/lib/zkProof";
import { Button } from "@nextui-org/react";
import { IDKitWidget, IErrorState, ISuccessResult, VerificationLevel } from "@worldcoin/idkit";
import { useEffect, useState } from "react";

export default function HotelBookingVerifierComponent() {

    const { bookingProofData } = useHotelBookingWithProof();
    const [hasVerifiedIdentity, setHasVerifiedIdentity] = useState<boolean>(false);
    const [verifiedProof, setVerifiedProof] = useState<ISuccessResult>();


    useEffect(() => {
        if (!bookingProofData) {
            return;
        }

    }, [bookingProofData]);


    const onSuccess = async (proof: ISuccessResult) => {
        console.log("Worldcoin proof:", proof);
        // TODO: Send this proof to our backend for verification
        setHasVerifiedIdentity(true);
        setVerifiedProof(proof);

        if (bookingProofData) {
            await verifyZkProofSC(bookingProofData);
        }

    };

    const onError = (errorState: IErrorState) => {
        console.log(`Errored signing in with world coin ID`, errorState);
        setHasVerifiedIdentity(false);
        setVerifiedProof(undefined);
    }
    return (
        <div className="flex flex-col items-center justify-start">
            {(hasVerifiedIdentity && verifiedProof) && <p>{`Successfully verified world human: ${verifiedProof.nullifier_hash}`}</p>}
            {/* <p>Hotel Bookings Made</p> */}
            {(bookingProofData && !hasVerifiedIdentity) && <IDKitWidget
                app_id={process.env.NEXT_PUBLIC_WLD_CLIENT_ID as `app_${string}`}
                action='verify_user_booking'
                signal={`verify_your_uniqueness`}
                onSuccess={onSuccess}
                onError={onError}
                handleVerify={onSuccess}
                verification_level={VerificationLevel.Device}
            >
                {({ open }) => <Button
                    type='button'
                    className="rounded-[12px] bg-green-700 text-white p-4 h-[48px]"
                    onClick={open}>
                    Please Verify Your World Identity
                </Button>}


            </IDKitWidget>}
        </div>
    );
}