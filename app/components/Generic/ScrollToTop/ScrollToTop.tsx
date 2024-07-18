
import { useCallback } from 'react';

const ScrollToTop = ({children, className}: {children: React.ReactNode, className?: string}) => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <button className={className} onClick={scrollToTop}>
      {children}
    </button>
  );
}

export default ScrollToTop