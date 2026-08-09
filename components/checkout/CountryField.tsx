import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";
import CountryOptions from "./CountryOptions";

type CountryFieldProps = {
    register: UseFormRegister<any>,
    errors?: DeepMap<any, FieldError>,
}

function CountryField({ register, errors }: CountryFieldProps) {
    const error = errors?.["country"]
    return (
        <div className="w-56 shrink-0 block relative align-text-bottom pr-4 text-right">
            <div className="relative">
                <select
                    id="country"
                    aria-label="Country"
                    aria-invalid={error ? true : undefined}
                    className={`block appearance-none w-full hover:border-gray-500 px-4 py-2 pr-8 leading-tight focus:outline-none focus:border bg-transparent focus:border-blue-400 border ${error ? "border-red-500" : "border-transparent"}`}
                    {...register("country")}
                >
                    <CountryOptions />
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
            {/* Always rendered so showing the error doesn't shift the layout. */}
            <p className="min-h-[1.5rem] pt-1 text-sm text-red-600 italic">{error?.message ?? ""}</p>
        </div>
    )
}

export default CountryField
