"use client";

import React from "react";
import {
  Button,
  Input,
  Checkbox,
  Link,
  Divider,
  link,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function ForgotPasswordPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [linkSent, setLinkSent] = React.useState(false);

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

      {!linkSent && (
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large z-10 p-8">
          <p className="pb-2 text-xl font-medium">Forgot your password?</p>
          <p className="text-default-500">
            Type your email and we’ll send you a link to create a new password.
          </p>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              label="Email Address"
              name="email"
              placeholder="Enter your email"
              type="email"
              variant="bordered"
            />

            <Button
              radius="full"
              className="bg-gradient-to-tl #6AC9B8 #02AACF text-white"
              onClick={() => setLinkSent(true)}
            >
              Send link
            </Button>
          </form>

          <p className="text-center text-small">
            Don't have an account?&nbsp;
            <Link
              href="/signup"
              size="sm"
              style={{
                background:
                  "linear-gradient(91.81deg, #6AC9B8 0.72%, #02AACF 99.41%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline",
              }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      )}
      {linkSent && (
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large z-10 p-8">
          <p className="pb-2 text-xl font-medium">Check your inbox</p>
          <p className="text-default-500">
            We sent you a link to your email tedj@kayyo.xyz to create a new
            password.
          </p>

          <img src="/link-sent.png" alt="Email sent" />

          <p className="text-center text-small">
            Didn't receive the email?&nbsp;
            <Link
              href="/signup"
              size="sm"
              style={{
                background:
                  "linear-gradient(91.81deg, #6AC9B8 0.72%, #02AACF 99.41%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline",
              }}
            >
              Resend
            </Link>
          </p>
        </div>
      )}
      <img
        src="/Kayyo-Logo-White-RGB_1x_1.svg" // Replace with your logo's path
        alt="Logo"
        className="absolute bottom-0 left-0 m-8 w-auto h-15" // Adjust margins and size as needed
      />
    </div>
  );
}
