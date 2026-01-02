import Link from 'next/link'

export default function Header() {
  return (
    <>
      <header className="header">
        <nav className="nav">
        <HeaderLink to="/" title="My Blog"/>
        <HeaderLink to="/" title="About"/>
        </nav>
      </header>
    </>
  )
}

type HeaderLinkProps = { to: string, title: string }
function HeaderLink({ to, title }: HeaderLinkProps) {
  return (
    <Link href={to}>
      {title}
    </Link>
  )
}