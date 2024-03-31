"use client";

import React, { PropsWithChildren, useEffect } from "react";
import { Avatar } from "@nextui-org/react";
import { Card, Image } from "@nextui-org/react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { createFirebaseApp } from "./firebase";
import { fetchUserStats } from "./endpoints/userprofile";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import LogRocket from 'logrocket';
import { useAnalytics } from "./analytics/useAnalytics";
LogRocket.init('q89rlz/kayyo-webapp');


function StatCard({children}: PropsWithChildren)  {
  return (
    <Card shadow='none' className="h-auto flex-1 gap-4 p-4 sm:px-8 sm:py-10 items-center justify-center">
      {children}
    </Card>
  )
}

function PunchesThrownCard({punchesThrown}) {
  return (
    <StatCard>
      <p className="text-5xl font-bold">{punchesThrown}</p>
      <p className="text-l sm:text-2xl font-semibold text-center">Punches thrown</p>
    </StatCard>
  )
}

function StreaksCard({streakCount}) {
  return (
    <StatCard>
      <div className="flex items-center justify-center gap-4">
        <div>
          <div className="h-[40px] w-[40px] bg-[#2C2C2E] text-xl rounded-full flex items-center justify-center">
          🔥
          </div>
        </div>
        <p className="text-base text-[#D9D9D9]">STREAK SCORE</p>
      </div>
      <p className="text-5xl font-bold text-transparent bg-gradient-to-b bg-clip-text from-[#F53003] via-[#FFBD48] to-[#FCFBD8]">{streakCount}</p>
      <p className="text-l sm:text-2xl font-semibold">Days in a row</p>
    </StatCard>
  )
}


export default function Home() {
  const { reset } = useAnalytics()
  const [authUser, setAuthUser] = React.useState(null);
  const [leaderboardData, setLeaderboardData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const app = createFirebaseApp();
    const auth = getAuth(app);

    if (auth.currentUser) {
      setAuthUser(auth.currentUser);
    }

    setLoading(true);
    fetchUserStats(authUser?.uid)
      .then((data) => {
        console.log(data);
        setLeaderboardData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [authUser]);

  useEffect(() => {
    const app = createFirebaseApp();
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, you can use the user object to get user information
        setAuthUser(user);
        console.log(user);
      } 
      else {
        // User is signed out
        console.log("User is signed out");
        reset();
        window.location.href = "/login";
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black-100 p-10">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4  text-white">
        <Avatar
          size="lg"
          isBordered
          color="default"
          src={authUser?.photoURL}
          onClick={onOpen}
        />

        <Modal className="max-w-xl w-full" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent className="px-4 pb-4 pt-12 sm:pb-12 sm:px-8 bg-[#222222]">
            {(onClose) => (
              <>
                <ModalHeader className="p-0 flex flex-col gap-1 text-[28px] pb-11">
                  Welcome, {authUser?.displayName}
                </ModalHeader>
                <ModalBody className="p-0 text-sm">
                  <p>LEADERBOARD RANK</p>
                  <Card shadow='none' className="mb-2 sm:mb-6">
                    <div className="flex items-center justify-between px-8 py-4 bg-[#1C1C1E]">
                      <div className="flex-row items-center gap-[16px]">
                        <p className="text-2xl w-min font-bold">{leaderboardData?.leaderboardRank}</p> 
                        <p className="text-sm text-[#B3B3B3] font-semibold">{leaderboardData?.firstName}</p> 
                      </div>
                      <div className="flex-row items-center gap-[8px]">
                        <p className="text-2xl font-bold">{leaderboardData?.points ?? 0}</p>
                        <p className="text-base">Points</p>
                      </div>
                    </div>
                  </Card>
                  <div className="flex flex-row gap-5 justify-between">
                    <PunchesThrownCard punchesThrown={leaderboardData?.totalPunches}/>
                    <StreaksCard streakCount={leaderboardData?.streakCount}/>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
        <Card className="flex items-center justify-center rounded-full p-2">
          {leaderboardData?.streakCount}🔥
        </Card>
      </div>

      {/* Large central section */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <Image src="/background.jpeg" width={"1280"} height={310} />
      </div>

      {/* Bottom section with 4 equal parts */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        <Card className="relative" onClick={() => (window.location.href = "/boxing-workout")}>
          <Image
            src="/donny.png"
            alt="Donny"
            width={500}
            height={500}
            isZoomed
			onClick={() => (window.location.href = "/boxing-workout")}
          />
          <div className="absolute top-0 left-0 w-full h-20 flex items-center justify-center bg-black bg-opacity-50 text-xl font-NFUltra z-10">
            BOXING
          </div>
        </Card>
        <Card className="relative">
          <Image src="/aart.png" alt="Aart" width={500} height={500} isZoomed />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 text-xl font-NFUltra z-10">
            <p>KICKBOXING</p>
            <img src="/locked.png" alt="Locked" className="mt-2" />
          </div>
        </Card>
        <Card className="relative">
          <Image
            src="/somchai.png"
            alt="Somchai"
            width={500}
            height={500}
            isZoomed
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 text-xl font-NFUltra z-10">
            <p>MUAY THAI</p>
            <img src="/locked.png" alt="Locked" className="mt-2" />
          </div>
        </Card>
        <Card className="relative">
          <Image
            src="/athena.png"
            alt="Athena"
            width={500}
            height={500}
            isZoomed
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 text-xl font-NFUltra z-10">
            <p>FITNESS</p>
            <img src="/locked.png" alt="Locked" className="mt-2" />
          </div>
        </Card>
      </div>
    </div>
  );
}
