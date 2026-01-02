import Link from "next/link";
import { useState } from "react";

/**
 * Price update popup.
 *
 */
export default function PriceUpdate() {
  const [open, setOpen] = useState(true);
  const close = () => setOpen(false);
  return (
    <>
      {open && (
        <div className="px-5 py-2 md:py-3 bg-black flex text-xs md:text-sm ">
          <div className="flex-grow" />
          <Link href="/#pricing" className="text-white text-center">
            We&apos;re updating our pricing, with limited time 50% discount until 8
            of May.
          </Link>
          <div className="flex-grow"/>
          <span onClick={close} className="cursor-pointer text-white">
            x
          </span>
        </div>
      )}
    </>
  );
}
