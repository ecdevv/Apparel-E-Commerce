'use client'
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollFix() {
	// when clicking a link, user will not scroll to the top of the page if the header is sticky.
	// their current scroll position will persist to the next page.
	// this useEffect is a workaround to 'fix' that behavior.

	const pathname = usePathname();
	useEffect(() => {
		window.scroll(0, 0);
	}, [pathname]);
	
	return <></>;
}

// Found on July 10th, 2024, by bdlowery on July 18, 2023: https://github.com/vercel/next.js/issues/45187