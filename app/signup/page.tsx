"use client";

import React from "react";
import { Button, Input, Checkbox, Link, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function SignUpPage() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex h-screen w-screen items-center justify-center p-2 sm:p-4 lg:p-8">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://kayyo-static-assests.s3.us-east-2.amazonaws.com/background-video-login.mp4"
        autoPlay
        style={{ opacity: 0.5 }}
        muted
        loop
      >
        Your browser does not support the video tag.
      </video>

      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large z-10">
        <p className="pb-2 text-xl font-medium">Sign Up</p>
        <p className="text-default-500">Chose one of the options to signup</p>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            label="User Name"
            name="userName"
            placeholder="Enter your user name"
            type="text"
            variant="bordered"
          />
          <Input
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />
          <Input
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />

          <Button
            radius="full"
            className="bg-gradient-to-tl #6AC9B8 #02AACF text-white"
          >
            Sign Up
          </Button>
        </form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            Continue with Google
          </Button>
          <Button
            startContent={
              <Icon
                className="text-default-500"
                icon="ic:baseline-apple"
                width={24}
              />
            }
            variant="bordered"
          >
            Continue with Apple
          </Button>
        </div>
        <p className="text-center text-small">
            Already have an account?{" "}
          <Link
            href="/login"
            size="sm"
            style={{
              background:
                "linear-gradient(91.81deg, #6AC9B8 0.72%, #02AACF 99.41%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline",
            }}
          >
            Sign In
          </Link>
        </p>
      </div>
      <img
        src="/Kayyo-Logo-White-RGB_1x_1.svg" // Replace with your logo's path
        alt="Logo"
        className="absolute bottom-0 left-0 m-8 w-auto h-15" // Adjust margins and size as needed
      />
    </div>
  );
}
