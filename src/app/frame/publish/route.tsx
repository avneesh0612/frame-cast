import neynarClient from "@/lib/neynarClient";
import prisma from "@/lib/prisma";
import { createFrames, Button } from "frames.js/next";

const frames = createFrames({});

const HOST = process.env.HOST || "http://localhost:3000";

const handleRequest = frames(async (payload) => {
  const text = payload.message?.inputText;
  const fid = payload.message?.requesterFid;

  const user = await prisma.user.findUnique({
    where: {
      fid: String(fid),
    },
  });

  if (!user) {
    return {
      image: (
        <div style={{ color: "white", display: "flex", fontSize: 60 }}>
          User not found!
        </div>
      ),
      buttons: [
        <Button action="link" key="login" target={HOST}>
          Sign in
        </Button>,
      ],
    };
  }

  const cast = await neynarClient.publishCast(user?.signerUUID, text || "gm");

  return {
    image: (
      <div tw="flex items-center justify-center h-full w-full bg-black">
        <div tw="text-white text-6xl flex">
          Casted successfully! 🎉
          {cast?.hash}
        </div>
      </div>
    ),
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
