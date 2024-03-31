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

const Rest = React.forwardRef(({ workoutCompleted, roundCompleted }) => {
  // State to keep track of the selected card
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [seconds, setSeconds] = React.useState(10);

  React.useEffect(() => {
    // Start the countdown
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);

      if (seconds === 0) {
        clearInterval(interval);
        workoutCompleted();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const workoutDescription = ["Jab Training Room", "Punch Rush Challenge"];

  // Function to handle card selection
  const handleSelectCard = (cardId) => {
    console.log(cardId);
    setNumRounds(cardId);
    setSelectedCard(cardId);
  };
  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 lg:grid lg:grid-cols-[2fr_1fr] lg:items-start"
      )}
    >
      <div className="flex flex-col p-18 items-center justify-center">
        {/* Left Side */}
        <div className="relative h-full w-full flex-none">
          <Breadcrumbs>
            <BreadcrumbItem>WORKOUT</BreadcrumbItem>
            <BreadcrumbItem>TAKE A REST</BreadcrumbItem>
          </Breadcrumbs>

          {/* Main Image */}
          <Image
            width={845}
            height={845 - 103}
            radius="lg"
            src={"/rest-background.png"}
          />
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
        <Button
          disabled={!selectedCard}
          className="w-full"
          onClick={() => onConfigure({ rounds: selectedCard })}
        >
          THE NEXT WORKOUT WILL START IN {seconds} SECONDS...
        </Button>
      </div>
    </div>
  );
});

Rest.displayName = "Rest";

export default Rest;
