import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router'

const links: HeaderLinkProps[] = [
  { to: "/#pricing", title: "Pricing" },
  { to: "https://docs.kubernetic.com", title: "Docs" },
  { to: "https://docs.kubernetic.com/tutorials/", title: "Tutorials" },
  { to: "/blog", title: "Blog" },
]

type HeaderShellProps = { className: string, innerClassName: string }
function HeaderShell({ className, innerClassName }: HeaderShellProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Close the panel on navigation and on escape
  useEffect(() => {
    const close = () => setOpen(false)
    router.events.on('routeChangeStart', close)
    router.events.on('hashChangeStart', close)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => {
      router.events.off('routeChangeStart', close)
      router.events.off('hashChangeStart', close)
      window.removeEventListener('keydown', onKey)
    }
  }, [router.events])

  return (
    <header className={`${className} ${open ? 'bg-blue-500' : ''}`}>
      <div className={innerClassName}>
        <div className="flex py-8 items-center">
          <Logo />
          <div className="flex-grow"></div>
          <nav className="hidden md:flex items-center justify-end space-x-8">
            {links.map(l => <HeaderLink key={l.to} {...l} />)}
            <div className="px-4" />
            <HeaderButton to="/team/trial" title="Try Team" />
          </nav>
          <button
            type="button"
            className="md:hidden -mr-2 p-2 text-white rounded-md hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="md:hidden absolute top-full inset-x-0 z-50 bg-blue-500 border-t border-white/20 shadow-xl">
          <ul className="px-6 py-3">
            {links.map(l => (
              <li key={l.to}>
                <Link
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="block w-full px-4 py-3 rounded-md text-lg font-medium text-white hover:bg-white/10 hover:text-white focus:outline-none focus:bg-white/10 transition"
                >
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 pt-2 pb-6">
            <Link
              href="/team/trial"
              onClick={() => setOpen(false)}
              className="btn btn-indigo flex w-full items-center justify-center px-4 py-3 rounded-md text-lg"
            >
              Try Team
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

export default function Header() {
  return (
    <HeaderShell
      className="absolute top-0 inset-x-0 z-50"
      innerClassName="max-w-7xl mx-auto px-6 md:px-20"
    />
  )
}

export function HeaderSolid() {
  return (
    <HeaderShell
      className="relative z-50 bg-blue-500 hideout background"
      innerClassName="max-w-7xl mx-auto px-6 sm:px-20"
    />
  )
}

type HeaderLinkProps = { to: string, title: string }
function HeaderButton({ to, title }: HeaderLinkProps) {
  return (
    <span className="inline-flex rounded-md shadow">
      <Link href={to} className="btn btn-indigo btn-popup inline-flex items-center justify-center px-4 py-2 rounded-md">
        {title}
      </Link>
    </span>
  )
}

function HeaderLink({ to, title }: HeaderLinkProps) {
  return (
    <span className="inline-flex">
      <Link href={to} className="whitespace-nowrap text-base leading-6 font-medium text-white hover:underline hover:text-white focus:outline-none focus:text-white">
        {title}
      </Link>
    </span>
  )
}

function Logo() {
  return (
    <Link href="/" className="px-4 flex-none">
      <Image className="h-8 w-auto" width={256} height={38} src="/images/kubernetic.webp" alt="Kubernetic" />
    </Link>
  )
}
