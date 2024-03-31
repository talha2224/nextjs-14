import { usePathname, useSearchParams } from 'next/navigation'
import { usePostHog } from 'posthog-js/react'
import { useEffect, useState } from 'react'

// Add event types here
export type AnalyticsEvent = 
  'pageview' | 
  'user:click' | 
  'user:signin' | 
  'user:signup' | 
  'training-session:started' | 
  'training-session:ended'

export function useAnalytics() {
  const [isReady, setIsReady] = useState(false);

  const posthog = usePostHog() 

  const identify = (userId: string, payload: Record<string, any>) => {
    posthog?.identify(userId, payload)
  }

  const capture = (event: AnalyticsEvent, payload?: Record<string, any>) => {
    posthog?.capture(event, payload)
  }

  // recommended to call on logout https://posthog.com/docs/product-analytics/identify#3-reset-after-logout
  const reset = () => {
    posthog?.reset()
  }

  useEffect(() => {
    setIsReady(!!posthog)
  }, [posthog])
  
  return { identify, capture, reset, isReady }
}
