'use client'
import React, { useEffect } from 'react'

export const UpdateURL = ({searchParams, url}: {searchParams: {name: string, id: string, option: string, size: string}, url: string}) => {
  // Update URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', url);
    }
  }, [searchParams])
  return <></>
}
