import {HeaderLogo} from '../components/Navbar/Navbar'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='auth-page-wrapper'>
      <header className='auth-page-header'><HeaderLogo /></header>
      <main>{children}</main>
    </div>
    )
}