import React from "react"
import { HeartIcon } from "./Icons"

export default function Footer() {
  return (
    <div className="border-t border-gray-300 border-dashed p-8 pb-6 md:pb-10">
      <div className="text-center italic text-xs text-gray-700">
        <div className="inline-flex">©&nbsp;<a rel="noopener" target="_blank" className="dotted" href="https://harbur.io">Harbur Cloud Solutions</a>, 2022. Made with <HeartIcon />
        </div>
      </div>
      <div className="text-center italic text-xs text-gray-700">
        <a rel="noopener" target="_blank" className="border-b border-gray-500 border-dotted" href="https://harbur.io/privacy">Privacy Policy</a>
      </div>
    </div>
  )
}
