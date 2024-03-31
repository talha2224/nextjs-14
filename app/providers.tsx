"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import dynamic from 'next/dynamic'


export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

// PostHog Setup
const PostHogPageView = dynamic(() => import('./analytics/PostHogPageView'), {
  ssr: false,
})

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    }
  })
}
 
export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  // Initialize Firebase

  return (
    <PostHogProvider client={posthog}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>
          <PostHogPageView />
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </PostHogProvider>
  );
}
