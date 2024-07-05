import {HeaderLogo} from '../components/Navbar/Navbar'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className='margin'><HeaderLogo /></header>
      <main>{children}</main>
    </>
    )
}