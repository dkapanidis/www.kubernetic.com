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

type PlausibleFn = {
  (event: string, options?: { props?: PlausibleProps }): void
  q?: IArguments[]
}

declare global {
  interface Window {
    plausible?: PlausibleFn
  }
}

/** The Buy click: the checkout goal the admin's funnel reads. */
export const CHECKOUT_EVENT = 'Checkout'

export function trackEvent(event: string, props?: PlausibleProps) {
  if (typeof window === 'undefined') return
  if (!window.plausible) {
    const queued: PlausibleFn = function () {
      ;(queued.q = queued.q || []).push(arguments)
    }
    window.plausible = queued
  }
  window.plausible(event, props ? { props } : undefined)
}
