"use client";

import React from "react";
import { Button, Input, Checkbox, Link, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { getAuth, signInWithPopup,OAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { createFirebaseApp } from "../firebase";
import { useAnalytics } from "../analytics/useAnalytics";

export default function SignUpPage() {
  const { identify, capture } = useAnalytics()

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [user, setUser] = React.useState(null);
  const [loadingUser, setLoadingUser] = React.useState(true); // Helpful, to update the UI accordingly.

  React.useEffect(() => {
    // Listen authenticated user
    const app = createFirebaseApp();
    const auth = getAuth(app);
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          identify(user.uid, user)
          capture('user:signin')

          window.location.href = "/"; // Redirect if user is already logged in
        } else setUser(null);
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  // Function to handle Google sign-in
  const signInWithGoogle = async () => {
    const app = createFirebaseApp();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithRedirect(auth, provider); 
      // Use result.user to get the signed-in user info.
      console.log(result.user);
      window.location.href="/"
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithApple = async () => {
    const app = createFirebaseApp();
    const auth = getAuth(app);
    const provider = new OAuthProvider('apple.com'); 

    provider.addScope('email');
    provider.addScope('name');

    try {
      const result = await signInWithRedirect(auth, provider); 
      // Use result.user to get the signed-in user info.
      console.log(result.user);
      window.location.href="/"

    } catch (error) {
      console.error(error);
    }
  };

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
        <p className="pb-2 text-xl font-medium">Welcome back champ!</p>

        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
            onClick={signInWithGoogle} // Attach the signInWithGoogle function
          >
            Continue with Google
          </Button>
          <Button
            startContent={<Icon icon="file-icons:apple" width={24} />}
            variant="bordered"
            onClick={signInWithApple} // Attach the signInWithApple function
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
        src="/Kayyo-Logo-White-RGB_1x_1.svg"
        alt="Logo"
        className="absolute bottom-0 left-0 m-8 w-auto h-15" // Adjust margins and size as needed
      />
    </div>
  );
}
