import { useState } from "react"
import { OutboundLink } from "react-ga"
import { AppleIcon, DropdownIcon, LinuxIcon, WinIcon } from "./Icons"

export default function CTAButton() {
  const [isOpen, updateIsOpen] = useState(false)
  return (
    <>
      <div className="inline-flex">
        <div className="relative">
          <div className="btn-popup inline-flex w-56 divide-x divide-green-600 hover:shadow-lg">
            <OutboundLink
              eventLabel="download mac"
              to="https://kubernetic.s3.amazonaws.com/Kubernetic-3.2.0.dmg">
              <button className="btn btn-green inline-flex w-48 rounded-l  px-3 py-3 pl-4">
                <AppleIcon />
                <span>Download for Mac</span>
              </button>
            </OutboundLink>
            <button aria-label="choose-os" className="btn btn-green inline-flex transition rounded-r ease-in-out duration-150 px-3 py-3"
              onClick={() => updateIsOpen(!isOpen)}>
              <DropdownIcon />
            </button>
          </div>
          {isOpen && <DropdownMenu />}
        </div>
      </div>
    </>
  )
}


const DropdownMenu = () => (
  <div className="absolute">
    <ul className="w-56 ml-1 p-2 mt-2 text-gray-600 bg-white border border-gray-100 rounded-lg shadow-md min-w-max-content right-0" aria-label="submenu">
      <DropdownMenuItem icon={<WinIcon />} text="Download for Windows" eventLabel="download win" to="https://kubernetic.s3.amazonaws.com/Kubernetic+Setup+3.2.0.exe" />
      <DropdownMenuItem icon={<LinuxIcon />} text="Download for Linux" eventLabel="download linux" to="https://kubernetic.s3.amazonaws.com/Kubernetic-3.2.0.tar.gz" />
    </ul>
  </div>
)

type DropdownMenuProps = { icon: any, text: string, eventLabel: string, to: string }
function DropdownMenuItem({ icon, text, eventLabel, to }: DropdownMenuProps) {
  return (
    <OutboundLink
      eventLabel={eventLabel}
      to={to}
    >
      <li>
        <a className="inline-flex items-center cursor-pointer w-full px-2 py-2 text-sm font-medium transition-colors duration-150 rounded-md hover:bg-gray-200 hover:text-gray-800" type="button">
          {icon}
          <span>{text}</span>
        </a>
      </li>
    </OutboundLink>
  )
}
