import React from "react"
import './Rating.css'

const Rating = ({ rating, reviewCount }: { rating: number, reviewCount: number }) => {
  const wholeStars = Math.floor(rating);
  const fraction = rating % 1;

  return (
    <div className="rating-container">
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          {((i < wholeStars) || (i === wholeStars && fraction >= 0.8)) &&
            <svg aria-hidden className="star filled" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          }
          {((i === wholeStars && fraction >= 0.4 && fraction < 0.8) || (i === wholeStars && rating < 0.5)) &&
            <svg aria-hidden className="star" viewBox="0 0 20 20">
              <defs>
                <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="50%" style={{ stopColor: "rgba(var(--review-star-filled-color))", stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: 'rgba(var(--review-star-color))', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          }
          {((i === wholeStars && fraction < 0.4) && !(i === wholeStars && rating < 0.5)) &&
            <svg aria-hidden className="star" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          }
          {i > wholeStars &&
            <svg aria-hidden className="star" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          }
        </span>
      ))}
      <p className='rating-value'>{rating !== -1 ? `${(rating).toFixed(rating % 1 ? 1 : 0)}` : 'N/A'}</p>
      {reviewCount > 0 && <p className='rating-value'>({reviewCount})</p>}
    </div>
  )
}

export default Rating;

