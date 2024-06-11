"use client";

import { NeynarContextProvider, Theme } from "@neynar/react";
import "@neynar/react/dist/style.css";
import { Inter } from "next/font/google";
import "./globals.css";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NeynarContextProvider
        settings={{
          clientId: process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID || "",
          defaultTheme: Theme.Light,
          eventsCallbacks: {
            onAuthSuccess: ({ user }) => {
              axios.post("/api/add-user", {
                signerUuid: user?.signer_uuid,
                fid: user?.fid,
              });
            },
            onSignout() {},
          },
        }}
      >
        <body className={inter.className}>{children}</body>
      </NeynarContextProvider>
    </html>
  );
}
