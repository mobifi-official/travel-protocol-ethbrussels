'use client';

import { useHotelBookingWithProof } from "@/src/app/utils/hooks/useHotelBookingWithProof";
import { verifyZkProofSC } from "@/src/lib/zkProof";
import { Button } from "@nextui-org/react";
import { IDKitWidget, IErrorState, ISuccessResult, VerificationLevel } from "@worldcoin/idkit";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { DialogCloseIcon } from "../../shared/custom-icons";





export default function HotelBookingVerifierComponent() {

    const { bookingProofData } = useHotelBookingWithProof();
    const [hasVerifiedIdentity, setHasVerifiedIdentity] = useState<boolean>(false);
    const [verifiedProof, setVerifiedProof] = useState<ISuccessResult>();
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [verificationIsInProgress, setVerificationIsInProgress] = useState<boolean>(false);
    const [bookingIsValid, setBookingIsValid] = useState<boolean>(false);
    const [isVerifyingWorldId, setIsVerifyingWorldId] = useState<boolean>(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    useEffect(() => {
        if (!bookingProofData) {
            return;
        }

    }, [bookingProofData]);


    const onSuccess = async (proof: ISuccessResult) => {
        setHasVerifiedIdentity(true);
        setVerifiedProof(proof);
        setVerificationIsInProgress(true);
    
        try {
            const isValid = await verifyZkProofSC(bookingProofData!);
            setBookingIsValid(isValid);
        } catch (error) {
            setBookingIsValid(false);
        } finally {
            setVerificationIsInProgress(false);
        }
    };
    

    const onError = (errorState: IErrorState) => {
        console.log(`Errored signing in with world coin ID`, errorState);
        setHasVerifiedIdentity(false);
        setVerifiedProof(undefined);
        setVerificationIsInProgress(false);
    }


    const child = useMemo(() => {
        if (verificationIsInProgress) {
            return (
                <div className="flex flex-col items-center justify-center gap-[12px]">
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-[44px] h-[44px] md:w-[80px] md:h-[80px] mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green5" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p className="text-green-700 text-center">Verification is in progress</p>
                </div>
            );
        } else if (!verificationIsInProgress && verifiedProof && bookingIsValid) {
            return (
                <div className="flex flex-col items-center justify-center mt-[20px] gap-[12px]">
                    <svg className="hidden md:inline-block" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <path d="M49.066 29.3003L34.766 43.6337L29.266 38.1337C28.9672 37.7847 28.5995 37.5013 28.1859 37.3012C27.7724 37.1012 27.3219 36.9887 26.8629 36.971C26.4038 36.9533 25.946 37.0306 25.5183 37.1982C25.0905 37.3658 24.702 37.62 24.3772 37.9448C24.0523 38.2697 23.7982 38.6582 23.6306 39.0859C23.463 39.5137 23.3856 39.9714 23.4034 40.4305C23.4211 40.8896 23.5335 41.34 23.7336 41.7536C23.9337 42.1671 24.2171 42.5348 24.566 42.8337L32.3994 50.7003C32.7108 51.0093 33.0802 51.2537 33.4863 51.4196C33.8925 51.5854 34.3273 51.6695 34.766 51.667C35.6405 51.6633 36.4785 51.3161 37.0994 50.7003L53.766 34.0337C54.0785 33.7238 54.3264 33.3551 54.4957 32.9489C54.6649 32.5427 54.752 32.107 54.752 31.667C54.752 31.227 54.6649 30.7913 54.4957 30.3851C54.3264 29.9789 54.0785 29.6102 53.766 29.3003C53.1415 28.6795 52.2966 28.331 51.416 28.331C50.5354 28.331 49.6906 28.6795 49.066 29.3003ZM39.9994 6.66699C33.4067 6.66699 26.962 8.62196 21.4804 12.2847C15.9987 15.9474 11.7263 21.1533 9.20338 27.2442C6.68046 33.3351 6.02035 40.0373 7.30652 46.5033C8.5927 52.9694 11.7674 58.9088 16.4291 63.5706C21.0909 68.2323 27.0303 71.407 33.4964 72.6932C39.9624 73.9793 46.6646 73.3192 52.7555 70.7963C58.8463 68.2734 64.0523 64.001 67.715 58.5193C71.3777 53.0377 73.3327 46.593 73.3327 40.0003C73.3327 35.6229 72.4705 31.2884 70.7953 27.2442C69.1202 23.2 66.6649 19.5254 63.5696 16.4301C60.4743 13.3348 56.7997 10.8795 52.7555 9.20434C48.7113 7.52918 44.3768 6.66699 39.9994 6.66699ZM39.9994 66.667C34.7252 66.667 29.5695 65.103 25.1842 62.1728C20.7988 59.2427 17.3809 55.0779 15.3626 50.2052C13.3442 45.3325 12.8162 39.9707 13.8451 34.7979C14.874 29.6251 17.4138 24.8735 21.1432 21.1441C24.8726 17.4147 29.6241 14.875 34.797 13.8461C39.9698 12.8171 45.3316 13.3452 50.2043 15.3635C55.077 17.3819 59.2417 20.7998 62.1719 25.1851C65.1021 29.5704 66.666 34.7262 66.666 40.0003C66.666 47.0728 63.8565 53.8555 58.8555 58.8565C53.8546 63.8575 47.0718 66.667 39.9994 66.667Z" fill="#30880B" />
                    </svg>
                    <p className="text-green-700 text-center font-bold">Booking is verified!</p>
                </div>
            );
        }
        return null;
    }, [verificationIsInProgress, verifiedProof, bookingIsValid]);
    

    return (
        <div className="flex flex-col items-center justify-start ">
            <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-2xl font-medium tracking-tight text-transparent md:text-7xl">
                Travel Potocol
            </h1>
            <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
                <div className="flex flex-col rounded-[12px] border-[1px] border-black gap-[20px]">
                    <p className="text-text-black font-normal text-center">Powered by<span className="text-black font-bold">{` World ID `}</span> and <span className="text-black font-bold">{` Polygon ZKP`}</span></p>
                </div>
                {child}
                {/* <p>Hotel Bookings Made</p> */}
                {(bookingProofData && !hasVerifiedIdentity) && <div className="flex flex-col items-center justify-center gap-[12px]">
                    <p className="text-black font-normal text-center">Ask your guest to verify their world ID:</p>
                    <IDKitWidget
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
                            className="rounded-full bg-green-700 font-bold text-white p-4 h-[48px]"
                            onClick={open}>
                            Verify
                        </Button>}

                    </IDKitWidget>
                </div>}
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    static
                    onClose={() => null}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="connectWalletModal">
                                    <div className="flex flex-row justify-end cursor-pointer">
                                        <div onClick={closeModal}>
                                            <DialogCloseIcon />
                                        </div>
                                    </div>
                                    {modalContent}
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}