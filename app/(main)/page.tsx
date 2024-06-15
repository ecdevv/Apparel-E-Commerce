import Carousel from '../components/Carousel/Carousel'
import Link from 'next/link';
import './home.css'

export default function Home() {
  return (
    <section className='home'> {/* TODO: Likely does not need to be a section once I start working on the rest of the page */}
      <section className="carousel-container">
        <Carousel/>
        <div className='slide-content'>
          <h1 className='slide-h1' data-text="NEW SUMMER COLLECTION">NEW SUMMER COLLECTION</h1>
          <Link href='/' aria-label='New' className='slide-btn'>Shop Now</Link>
        </div>
      </section>
      <Link href='/'>Link</Link>
    </section>
  );
}
