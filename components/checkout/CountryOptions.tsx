import { COUNTRIES } from "./countries";

/**
 * The country `<option>` list, shared by every country select so they all
 * submit the same ISO 3166-1 alpha-2 codes.
 *
 * The leading empty option is what makes "no choice yet" a distinct, invalid
 * value rather than silently defaulting to whichever country sorts first.
 */
export default function CountryOptions() {
    return (
        <>
            <option value="">Select your country</option>
            {COUNTRIES.map(({ code, name }) => (
                <option key={code} value={code}>{name}</option>
            ))}
        </>
    )
}
