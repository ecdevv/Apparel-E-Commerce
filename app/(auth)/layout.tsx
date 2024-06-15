import {HeaderLogo} from '../components/Navbar/Navbar'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HeaderLogo/>
      {children}
    </>
    )
}