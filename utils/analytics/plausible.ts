/**
 * Custom events for Plausible Analytics.
 *
 * The tracking script in _document.tsx counts pageviews on its own; anything
 * else the site wants counted is a named event sent from here. Each name has
 * to exist as a goal on the kubernetic.com site in Plausible, or it is dropped.
 *
 * The queue is Plausible's own snippet: a call made before the deferred
 * script has loaded is stored on `plausible.q` and replayed once it has.
 */

type PlausibleProps = Record<string, string | number | boolean>

type PlausibleOptions = { props?: PlausibleProps, callback?: () => void }

type PlausibleFn = {
  (event: string, options?: PlausibleOptions): void
  q?: IArguments[]
}

declare global {
  interface Window {
    plausible?: PlausibleFn
  }
}

/** The Buy click: the checkout goal the admin's funnel reads. */
export const CHECKOUT_EVENT = 'Checkout'

export function trackEvent(event: string, props?: PlausibleProps, callback?: () => void) {
  if (typeof window === 'undefined') {
    callback?.()
    return
  }
  if (!window.plausible) {
    const queued: PlausibleFn = function () {
      ;(queued.q = queued.q || []).push(arguments)
    }
    window.plausible = queued
  }
  window.plausible(event, { props, callback })
}

/**
 * Reports an event and then leaves the page. Navigating away cancels a request
 * still in flight, so the redirect waits for Plausible's callback — with a
 * short ceiling, because a blocked tracker never calls back and the buyer must
 * not be left on a dead button.
 */
export function trackThenNavigate(event: string, props: PlausibleProps, href: string) {
  let done = false
  const go = () => {
    if (done) return
    done = true
    window.location.href = href
  }
  trackEvent(event, props, go)
  window.setTimeout(go, 400)
}
