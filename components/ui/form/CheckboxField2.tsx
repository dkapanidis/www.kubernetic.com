import { UseFormRegister } from "react-hook-form";

export interface CheckboxFieldProps {
  name: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  register: UseFormRegister<any>;
  children: any;
}

export default function CheckboxField2({
  name,
  placeholder,
  required = false,
  readOnly = false,
  register,
  children,
}: CheckboxFieldProps) {
  return (
    <label className="block pt-4">
      <input
        {...register(name)}
        disabled={readOnly}
        required={required}
        name={name}
        type="checkbox"
        placeholder={placeholder}
      />
      <span className="pl-3 italic text-sm select-none">{children}</span>
    </label>
  );
}
{/* <input name="gdpr" id="gdpr" type="checkbox" checked={gdpr} onChange={() => updateGDPR(!gdpr)} />
<span className="pl-3 italic text-sm">I agree to receive Harbur marketing communications via email. I can always update my preferences later.</span>
</label> */}
