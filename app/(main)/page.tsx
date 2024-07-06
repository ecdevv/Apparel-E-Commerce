import Carousel from '../components/Carousel/Carousel'
import Link from 'next/link';
import CarouselImage from '../../public/images/home/carousel-item1.webp';
import CarouselImage2 from '../../public/images/home/carousel-item2.webp';
import CarouselImage3 from '../../public/images/home/carousel-item3.webp';
import CarouselImage4 from '../../public/images/home/carousel-item4.webp'; 
import './home.css'

export default function Home() {
  const Images = [CarouselImage, CarouselImage2, CarouselImage3, CarouselImage4];

  return (
    <div className='home'>
      <section className="carousel-container">
        <div className='desktop'><Carousel Images={Images} Width={75} BorderWidth={0.25} ShowNavArrows={true} ShowDotBtns={true} /></div>
        <div className='mobile-md'><Carousel Images={Images} Width={100} BorderWidth={0} ShowNavArrows={false} ShowDotBtns={true} /></div>
        <div className='mobile'><Carousel Images={Images} Width={100} BorderWidth={0} ShowNavArrows={false} ShowDotBtns={true} dotSmall={true} /></div>
        {/* <div className='slide-content'>
          <h1 className='slide-h1' data-text="NEW SUMMER COLLECTION">NEW SUMMER COLLECTION</h1>
          <Link href='/' aria-label='New' className='slide-btn'>Shop Now</Link>
        </div> */}
      </section>
      {/* <div>ss</div> */}
    </div>
  );

  //Photo by <a href="https://unsplash.com/@forcemajeure?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Force Majeure</a> on <a href="https://unsplash.com/photos/man-and-woman-in-white-and-gray-force-majeure-printed-crew-neck-t-shirts-standing-near-gray-concrete-wall-00tlC0Clfrs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  //Photo by <a href="https://unsplash.com/@demoya?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Michael DeMoya</a> on <a href="https://unsplash.com/photos/2-women-standing-near-wall-during-daytime-qI8xWRvfgGg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  //Photo by <a href="https://unsplash.com/@jcgellidon?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">JC Gellidon</a> on <a href="https://unsplash.com/photos/woman-leaning-on-wall-OGy5tojr7x8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  //Photo by <a href="https://unsplash.com/@minusculemarie?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Marie-Michèle Bouchard</a> on <a href="https://unsplash.com/photos/man-in-white-shirt-and-pants-sitting-on-gray-concrete-floor-J_zYSwczKYA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
}
