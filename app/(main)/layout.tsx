import Banner from "../components/banner/banner"
import Navbar from "../components/navbar/navbar"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <header>
        <Banner/>
        <Navbar/>
      </header>
      {children}
    </section>
  )
}

