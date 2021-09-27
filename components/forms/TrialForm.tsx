import { Trial } from "@components/models/Trial";
import CheckboxField2 from "@components/ui/form/CheckboxField2";
import InputField from "@components/ui/form/InputField";
import InputField2 from "@components/ui/form/InputField2";
import { addDoc, collection } from "@firebase/firestore";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFirestore } from "reactfire";
import * as yup from "yup";

const expectedUsersOptions = [
  { key: "1", text: "1", value: "1" },
  { key: "5", text: "5", value: "5" },
  { key: "10", text: "10", value: "10" },
  { key: "20", text: "20", value: "20" },
  { key: "50", text: "50", value: "50" },
  { key: "100+", text: "100+", value: "100+" }
]
const COLLECTION = 'trials'

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  jobTitle: yup.string().required(),
  country: yup.string().required(),
  expectedUsers: yup.number().required(),
  phone: yup.string().optional(),
  gdpr: yup.boolean().optional(),
  terms: yup.boolean().optional(),
  timestamp: yup.string().required(),
});

export default function TrialForm() {
  const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm<Trial>({
    defaultValues: {
      expectedUsers: 1,
      timestamp: timestampToday(),
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const terms = watch("terms")

  const col = collection(useFirestore(), COLLECTION);

  async function onSubmit(data: Trial) {
    console.log("data", data)
    try {
      const ref = await addDoc(col, {
        ...data,
        timestamp: new Date(data.timestamp),
      });
      console.log(ref)
      router.push("/")
    } catch (error) {
      // nothing but void
    }
  }

  return (
    <div className="p-10 text-left border shadow-xl rounded-lg border-blue-500">
      <h3>Get Started with Kubernetic Team in minutes</h3>

      <p className="pt-5 pb-5 font-extralight">After signing up, we will send you a trial license which will be active for 30 days with seats for 10 users. Once you get your license you can follow the installation process in <Link href="https://docs.kubernetic.com/installation/team"><a>our guide</a></Link>.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h6 className="pt-4 pb-2 underline">Trial Details</h6>
        <InputField2 errors={errors} register={register} name="name" label="Your Name" required />
        <InputField2 errors={errors} register={register} name="email" label="Company Email" required />
        <InputField2 errors={errors} register={register} name="jobTitle" label="Job Title" required />
        <h6 className="pt-4 pb-2 underline">Organization</h6>
        <InputField2 errors={errors} register={register} name="country" label="Country" required />
        <div className="inline-block relative w-full required field">
          <label>Expected Users</label>
          <div className="relative">
            <select className="block appearance-none w-full bg-white border hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border focus:border-blue-400" {...register("expectedUsers")}>
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100+">100+</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>

        </div>

        <InputField2 errors={errors} register={register} name="phone" label="Phone" />

        <CheckboxField2 register={register} name="gdpr">
          I agree to receive Harbur marketing communications via email. I can always update my preferences later.
        </CheckboxField2>

        <CheckboxField2 register={register} name="terms">
          I agree to the Harbur <Link href="https://harbur.io/privacy/index.html"><a rel="noopener" target="_blank" className="border-b border-gray-500 border-dotted">Terms of Use & Privacy Policy</a></Link>.
        </CheckboxField2>

        <input type="hidden" name="form-name" value="enterprise-trial" />
        <button className={`btn btn-green btn-popup mt-6 inline-flex rounded py-3 w-full ${!terms ? "opacity-50" : ""}`} type="submit" disabled={!terms}>Create Trial</button>
      </form>
    </div>
  )
}
export function timestampToday() {
  const d = new Date();
  return d.toLocaleString("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}
