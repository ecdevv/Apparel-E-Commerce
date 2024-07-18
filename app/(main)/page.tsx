import Carousel from '../components/Carousel/Carousel'
import CarouselImage1 from '../../public/images/home/carousel-item1.webp';
import CarouselImage2 from '../../public/images/home/carousel-item2.webp';
import CarouselImage3 from '../../public/images/home/carousel-item3.webp';
import CarouselImage4 from '../../public/images/home/carousel-item4.webp'; 
import './home.css'

export default function Home() {
  const Images = [CarouselImage1, CarouselImage2, CarouselImage3, CarouselImage4];

  return (
    <div className='home'>
      <section className="home-carousel-container">
        <div className='home-desktop'><Carousel Images={Images} Width={75} BorderWidth={0.25} ShowNavArrows={true} ShowDotBtns={true} navArrowSize={50} /></div>
        <div className='home-mobile-md'><Carousel Images={Images} Width={100} BorderWidth={0} ShowDotBtns={true} /></div>
        <div className='home-mobile'><Carousel Images={Images} Width={100} BorderWidth={0} ShowDotBtns={true} dotSmall={true} /></div>
        {/* <div className='slide-content'>
          <h1 className='slide-h1' data-text="NEW SUMMER COLLECTION">NEW SUMMER COLLECTION</h1>
          <Link href='/' aria-label='New' className='slide-btn'>Shop Now</Link>
        </div> */}
      </section>
      {/* <div>ss</div> */}
    </div>
  );
}
