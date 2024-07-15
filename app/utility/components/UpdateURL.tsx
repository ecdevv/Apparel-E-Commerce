'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

export const UpdateURL = ({searchParams, urlResponse}: {searchParams: any, urlResponse: any}) => {
  const router = useRouter();

  // FIXME: Back button does not work as intended
  // When navigating to the page with incorrect parameters, this succesfully updates the url, 
  // however, the url with incorrect parameters gets added to history FIRST because it is loading the wrong url first, which means
  // router.replace is working the way it should and is replacing the wrong url without adding to the history, but the wrong url got added already anyways.
  // Update URL (using window.history to immediately set the url visually in the browser & router.replace to update the url)
  useEffect(() => {
    if (typeof window !== 'undefined' && !urlResponse.error) {
      // window.history.replaceState({}, '', urlResponse.url);
      router.replace(urlResponse.url);
    }
  }, [searchParams])
  return <></>
}
