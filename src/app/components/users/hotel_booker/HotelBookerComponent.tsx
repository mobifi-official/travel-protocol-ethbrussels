'use client';

import { GeneratedProofResponse } from "@/src/app/models/zk-proof-models";
import { generateZKProof } from "@/src/lib/zkProof";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HotelBookerComponent() {

    const router = useRouter();


    const [worldCoinId, setWorldCoinId] = useState<string>();
    const [bookingId, setBookingId] = useState<string>();
    const [dateTimeBookingMade, setDateTimeBookingMade] = useState<string>();
    const [isGeneratingProof, setIsGeneratingProof] = useState<boolean>(false);
    const [proofDetails, setProofDetails] = useState<GeneratedProofResponse | null>();
    const [dummyProofThatWillFail, setDummyProofThatWillFail] = useState<GeneratedProofResponse>({
        proof: {
            pi_a: [
                "10384964260455187225095372348513671246021790280346562948830886706419110565897",
                "102884293898421712516863680837373636362436353535221681130855724250018496",
                "1"
            ],
            pi_b: [
                [
                    "18317634215200310590484371412217933518011607784874421778899054970407513632056",
                    "1821294982144107880548395943001000000049790948088431213005840440108"
                ],
                [
                    "737612075415212021024684406010407287276927012255033992959582845123783325647",
                    "2034668546120951762359131822441636372829129292925976071052291892928266845123"
                ],
                [
                    "1",
                    "0"
                ]
            ],
            pi_c: [
                "6709777788411390700534644185104620771046167024714178204815685780259231807336",
                "18804810501633552546484172778152032472627637953236680728614786920565582735802",
                "1"
            ],
            curve: "bn128",
            protocol: "groth16",
        },
        publicSignals: ["123456789098765123456789765430987654345678998765567890987654567829345234"]
    });

    useEffect(() => {
        setWorldCoinId("1234ETEYWUWU372YEGEYE");
        setBookingId("Booking123_37272");
        setDateTimeBookingMade((new Date()).toISOString());

    }, []);


    const { data: session, status } = useSession();
    return (
        <div className="flex flex-col items-center justify-start">
            <p>Make Booking</p>
            {(bookingId && worldCoinId && dateTimeBookingMade) &&
                <div className="flex flex-col items-center justify-start gap-[12px]">
                    <div className="flex flex-col p-4 items-start justify-start rounded-[12px]">
                        <p>Booking at ETH Brussels 2024 Hotel</p>
                        <div className="h-[20px]"></div>
                        <p>1 Room x 2 Nights</p>
                        <div className="h-[12px]"></div>
                        <p>EUR 129.43</p>
                    </div>
                    <Button
                        className="bg-green-600 text-white"
                        onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            try {
                                const response = await generateZKProof(worldCoinId, bookingId, dateTimeBookingMade);
                                setProofDetails(response);
                            } catch (error) {
                                setProofDetails(null);
                            }

                        }}>
                        Generate Proof
                    </Button>
                </div>
            }
            {(proofDetails) && <div>Successfully Generated Your Booking Proof</div>}
        </div>
    );
}