"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Image,
  Link,
  RadioGroup,
  BreadcrumbItem,
  Breadcrumbs,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { cn } from "../cn";

const WorkoutConfigurator = React.forwardRef(({setNumRounds, onConfigure, ref}) => {
  // State to keep track of the selected card
  const [selectedCard, setSelectedCard] = React.useState(null);

  const workoutDescription = [
    "Jab Training Room",
    "Punch Rush Challenge",
  ];

  // Function to handle card selection
  const handleSelectCard = (cardId) => {
    console.log(cardId);
    setNumRounds(cardId);
    setSelectedCard(cardId);
  };
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col gap-4 lg:grid lg:grid-cols-[2fr_1fr] lg:items-start"
      )}
    >
      <div className="flex flex-col p-18 items-center justify-center">
        {/* Left Side */}
        <div className="relative h-full w-full flex-none">
          <Breadcrumbs>
            <BreadcrumbItem>WORKOUT</BreadcrumbItem>
            <BreadcrumbItem>BOXING</BreadcrumbItem>
          </Breadcrumbs>

          {/* Main Image */}
          <Image
            width={845}
            height={845 - 103}
            radius="lg"
            src={"/donny.png"}
          />

          <div className="flex items-center justify-start gap-4">
            <p className="text-lg font-extrabold leading-7 text-center">
              DONNY
            </p>
            <svg
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2" cy="2" r="2" fill="#E5E5EA" />
            </svg>
            <p className="text-lg font-bold leading-7 text-center">NY</p>
          </div>
          <div className="flex items-center justify-start gap-4 font-sans">
            <p>
              {" "}
              Hey champ I’m Donny. No messin’ around here alright? You’ll be
              learning the sweet science with me ‘cause everyone has a plan till
              they get punched in the face.
            </p>
          </div>

          <div className="flex items-center justify-start gap-4 text-white">
            <p className="text-lg font-extrabold leading-6 text-left">
              HOW MANY ROUNDS YOU WANT TO DO?
            </p>
          </div>

          <div className="flex items-center justify-start gap-4 text-white">
            {[1, 3, 5].map((rounds) => (
              <Card
                key={rounds}
                isPressable
                onPress={() => handleSelectCard(rounds)}
                className={`${
                  selectedCard === rounds ? "border-2 border-yourColor" : ""
                }`} // Add your desired border color class in place of 'border-yourColor'
              >
                <CardBody className="text-center">
                  <h1>{rounds}</h1>
                  <p>ROUNDS</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col p-20 items-center justify-between h-full">
        <div className="flex flex-col">
          {/* Create a div with space between vertically */}
          <p className="text-lg font-extrabold leading-6 text-left">
            WHAT YOU ARE GOING TO DO IN THIS WORKOUT:
          </p>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-start gap-2 justify-between">
              {workoutDescription.map((description) => (
                <div className="flex items-center gap-2 font-sans">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="8"
                      fill="url(#paint0_linear_422_4319)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_422_4319"
                        x1="-4.78487e-08"
                        y1="3.78182"
                        x2="16.2736"
                        y2="4.29672"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#6AC9B8" />
                        <stop offset="1" stop-color="#02AACF" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button disabled={!selectedCard} className="w-full" onClick={() => onConfigure({ rounds: selectedCard })}>
          START NOW
        </Button>
      </div>
    </div>
  );
});

WorkoutConfigurator.displayName = "WorkoutConfigurator";

export default WorkoutConfigurator;
