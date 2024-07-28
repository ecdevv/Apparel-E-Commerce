import { CustomLink } from '../components/Buttons/General/General';
import Carousel from '../components/Carousel/Carousel'
import CarouselImage1 from '../../public/images/home/carousel-item1.webp';
import CarouselImage2 from '../../public/images/home/carousel-item2.webp';
import CarouselImage3 from '../../public/images/home/carousel-item3.webp';
import CarouselImage4 from '../../public/images/home/carousel-item4.webp';
import './home.css'

export default function Home() {
  const Images = [CarouselImage1, CarouselImage2, CarouselImage3, CarouselImage4];

  const CarouselContent = 
    <div className='slide-content'>
      <CustomLink href='/store' aria-label='Store' className='slide-btn'>Shop Now</CustomLink>
    </div>

  return (
    <div className='home'>
      <section className="home-carousel-container">
        <Carousel Images={Images} Content={CarouselContent} Width={75} BorderWidth={0.25} ShowNavArrows={true} ShowDotBtns={true} navArrowSize={50} />
      </section>
    </div>
  );
}
