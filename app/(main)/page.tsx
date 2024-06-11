import Carousel from '../components/carousel/carousel'
import Link from 'next/link';

export default function Home() {
  return (
    <section className='home'>
      <div className="carousel-container">
        <Carousel/>
        <div className='slide-content'>
          <h1 className='slide-h1' data-text="NEW SUMMER COLLECTION">NEW SUMMER COLLECTION</h1>
          <Link href='/' aria-label='New' className='slide-btn'>Shop Now</Link>
        </div>
      </div>
    </section>
  );
}
