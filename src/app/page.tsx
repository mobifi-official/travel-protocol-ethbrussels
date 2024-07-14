'use client';

import { useEffect, useState } from "react";
import { GeneratedProofResponse } from "./models/zk-proof-models";
import { useSession } from "next-auth/react"
import { Button, Tab, Tabs } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import HotelBookerComponent from "./components/users/hotel_booker/HotelBookerComponent";
import HotelBookingVerifierComponent from "./components/users/hotel-booking-verifier/HotelBookingVerifierComponent";
export default function Home() {

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


  const { data: session, status } = useSession()

  if (status === "authenticated") {

    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 w-full">
        <h1 className="appNameTitle text-white font-bold">Travel Protocol</h1>
        <div className="h-[20px]"></div>
        {/* <WorldcoinSignIn /> */}

        <div className="flex flex-col justify-center items-center w-[400px] gap-[12px]">
          <Tabs
            fullWidth
            color="primary"
            variant={'bordered'}
            aria-label="Tabs variants"
            radius="full">
            <Tab
              className="hotelDetailsPageTabText"
              key="user"
              title="User">
              <HotelBookerComponent />
            </Tab>
            <Tab
              className="hotelDetailsPageTabText"
              key="hotel"
              title="Hotel">
              <HotelBookingVerifierComponent />
            </Tab>

          </Tabs>
        </div>
      </main>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-[12px] min-h-screen">
      <h6 className="text-white font-bold">Sign In To Travel Protocol</h6>
      <Button
        className="rounded-[12px] bg-green-600 text-white p-4 h-[48px]"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          router.push("/api/auth/signin");
        }}
      >
        Sign In With Your World ID
      </Button>
    </div>
  );
}
