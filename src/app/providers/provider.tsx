"use client";
import React, { useEffect, useState } from "react";
import { WagmiProvider } from 'wagmi';

// Context providers for various application functionalities
import { NextUIProvider } from "@nextui-org/react";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from "@/src/config/wagmi-config/config";
import { SessionProvider } from "next-auth/react";
import HotelBookingWithGeneratedProofContextProvider from "./hotel/booking/HotelBookingWithGeneratedProofProvider";


// Initializing a new query client for react-query
const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <HotelBookingWithGeneratedProofContextProvider>
            <NextUIProvider>{mounted && children}</NextUIProvider>
          </HotelBookingWithGeneratedProofContextProvider>
        </SessionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
