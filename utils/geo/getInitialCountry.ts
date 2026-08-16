import { isValidCountry } from '@components/checkout/countries'
import { getCountryForTimezone } from 'countries-and-timezones'

/**
 * Best-effort guess at the visitor's country, for prefilling the checkout
 * country select.
 *
 * This runs entirely in the browser with no network call: the IANA timezone the
 * browser reports (e.g. "Europe/Madrid") maps to a country, falling back to the
 * region of the browser's locale (e.g. "en-GB" -> "GB"). Being synchronous, the
 * value is available in time for the field's first render, so there is no
 * flash of an empty select and nothing that can time out or be rate limited.
 *
 * It is only a convenience — a VPN, a traveller or a manually set clock will all
 * guess wrong, and the user can always change it. The form validates the country
 * on submit, so an unresolved guess just means an empty field, never a bad order.
 *
 * Returns "" when the country cannot be determined, or when called during
 * prerendering — the guess belongs to the visitor, not the build machine.
 */
export default function getInitialCountry(): string {
  if (typeof window === 'undefined') return ''

  return fromTimezone() ?? fromLocale() ?? ''
}

function fromTimezone(): string | undefined {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (!timezone) return undefined
    const code = getCountryForTimezone(timezone)?.id
    return isValidCountry(code) ? code : undefined
  } catch {
    return undefined
  }
}

function fromLocale(): string | undefined {
  try {
    const region = new Intl.Locale(navigator.language).region
    return isValidCountry(region) ? region : undefined
  } catch {
    return undefined
  }
}
