'use client';

import { IDKitWidget, IErrorState, ISuccessResult, VerificationLevel } from '@worldcoin/idkit';

export default function WorldcoinIdentityVerify() {
    const onSuccess = async (proof: ISuccessResult) => {
        console.log("Worldcoin proof:", proof);
        // TODO: Send this proof to our backend for verification

    };

    const onError = (errorState: IErrorState) => {
        console.log(`Errored signing in with world coin ID`, errorState);
    }

    return (
        <IDKitWidget
            app_id={process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID as `app_${string}`}
            action='verify_user_booking'
            signal={`verify_your_uniqueness`}
            onSuccess={onSuccess}
            onError={onError}
            handleVerify={onSuccess}
            verification_level={VerificationLevel.Device}
        >
            {({ open }) => <button
                type='button'
                onClick={open}>
                Please Verify Your Worldcoin Identity
            </button>}
        </IDKitWidget>
    );
}