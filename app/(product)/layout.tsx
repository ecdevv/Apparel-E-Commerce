import Banner from "../components/Banner/Banner"
import Navbar from "../components/Navbar/Navbar"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className='header'>
        {/* <Banner /> */}
        <Navbar />
      </header>
      {children}
    </>
  )
}

