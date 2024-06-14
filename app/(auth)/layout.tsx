import {HeaderLogo} from '../components/navbar/navbar'

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