import Banner from "../components/banner/banner"
import Navbar from "../components/navbar/navbar"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header>
        <Banner/>
        <Navbar/>
      </header>
      {children}
    </>
  )
}

