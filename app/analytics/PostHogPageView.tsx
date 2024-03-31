'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAnalytics } from "@/app/analytics/useAnalytics";

export default function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isReady, capture } = useAnalytics()

  // Track pageviews
  useEffect(() => {
    if (pathname && isReady) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      capture(
        'pageview',
        {
          '$current_url': url,
        }
      )
    }
  }, [pathname, isReady, searchParams])
  
  return null
}