import { resolveCountry } from '@components/checkout/countries'
import { useEffect } from 'react'
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'

const GEO_URL = 'https://ipapi.co/json/'
const GEO_TIMEOUT_MS = 3000

/**
 * Best-effort prefill of the country select from a geo-IP lookup.
 *
 * The lookup is purely a convenience: it is aborted after a short timeout,
 * failures are ignored, it never overwrites a country the user already picked,
 * and the reported name is resolved against the list of options so we can
 * never store a value the select cannot display. The form validates the
 * country on its own, so checkout works even when this never resolves.
 */
export default function useCountryPrefill(
  setValue: UseFormSetValue<any>,
  getValues: UseFormGetValues<any>
) {
  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), GEO_TIMEOUT_MS)

    fetch(GEO_URL, { signal: controller.signal })
      .then(res => (res.ok ? res.json() : Promise.reject(new Error(`geo lookup failed: ${res.status}`))))
      .then(response => {
        const country = resolveCountry(response?.country_name)
        // Don't clobber a selection the user made while the lookup was in flight.
        if (country && !getValues('country')) {
          setValue('country', country)
        }
      })
      .catch(() => {
        // Geo-IP is optional; the user picks the country manually instead.
      })
      .finally(() => clearTimeout(timeout))

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [setValue, getValues])
}
