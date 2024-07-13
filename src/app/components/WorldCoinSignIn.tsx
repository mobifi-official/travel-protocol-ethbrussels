'use client';

import { IDKitWidget, IErrorState, ISuccessResult, VerificationLevel } from '@worldcoin/idkit';
import axios from 'axios';

export default function WorldcoinSignIn() {
    const onSuccess = async (proof: ISuccessResult) => {
        console.log("Worldcoin proof:", proof);
        // TODO: Send this proof to our backend for verification
        try {
            const response = await axios.post('/api/auth/verify-worldcoin-proof', {
                proof,
                action: 'booking_sign_in',
                signal: `sign_in_to_booking_app`,
            });

            if (response.data.success) {
                console.log(`Proof verified successfully`);
            } else {
                console.error(`Failed to verify proof`);
            }
        } catch (error) {
            console.error('Error verifying proof:', error);
        }

    };

    const onError = (errorState: IErrorState) => {
        console.log(`Errored signing in with world coin ID`, errorState);
    }

    return (
        <IDKitWidget
            app_id={process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID as `app_${string}`}
            action='booking_sign_in'
            signal={`sign_in_to_booking_app`}
            onSuccess={onSuccess}
            onError={onError}
            handleVerify={onSuccess}
            verification_level={VerificationLevel.Device}
        >
            {({ open }) => <button type='button' onClick={open}>Sign in with Worldcoin</button>}
        </IDKitWidget>
    );
}