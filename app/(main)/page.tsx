import { CustomLink } from '../components/Buttons/General/General';
import Carousel from '../components/Carousel/Carousel'
import { ImageData } from '../utility/types';
import getBlurDataUrls from '../utility/getBlurDataUrls';
import './home.css'

export default async function Home() {
  const blurDataUrls = getBlurDataUrls();

  const Image1: ImageData = {
    src: '/images/home/carousel-item1.webp',
    alt: 'A man and woman posing together. They are both wearing white t-shirts in front of a stone wall.',
    blurDataUrl: blurDataUrls['/images/home/carousel-item1.webp'],
  }

  const Image2: ImageData = {
    src: '/images/home/carousel-item2.webp',
    alt: 'Two individuals standing together, one man wearing a white graphic tee and a woman in a black graphic tee. They are positioned in front of a wall adorned with street art, with a highway depicted in the background. The ground beneath them is wet.',
    blurDataUrl: blurDataUrls['/images/home/carousel-item2.webp'],
  }

  const Image3: ImageData = {
    src: '/images/home/carousel-item3.webp',
    alt: 'A greyscaled image of a woman leaning against a wall in a street outfit. The setting is urban, with the woman looking towards the ground.',
    blurDataUrl: blurDataUrls['/images/home/carousel-item3.webp'],
  }

  const Image4: ImageData = {
    src: '/images/home/carousel-item4.webp',
    alt: 'A person is crouched down, dressed in casual clothing, and looking down at the ground towards us in an urban setting.',
    blurDataUrl: blurDataUrls['/images/home/carousel-item4.webp'],
  }

  const Images = [Image1, Image2, Image3, Image4];

  const CarouselContent = 
    <div className='slide-content'>
      <CustomLink href='/store' aria-label='Store' className='slide-btn'>Shop Now</CustomLink>
    </div>

  return (
    <div className='home'>
      <section className="home-carousel-container">
        <div className='home-desktop'><Carousel Images={Images} Content={CarouselContent} Width={75} BorderWidth={0.25} ShowNavArrows={true} ShowDotBtns={true} navArrowSize={50} /></div>
        <div className='home-mobile'><Carousel Images={Images} Content={CarouselContent} Width={100} BorderWidth={0} ShowNavArrows={true} ShowDotBtns={true} /></div>
      </section>
    </div>
  );
}
