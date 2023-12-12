'use client'

import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { usePathname } from 'next/navigation'
import { Icons } from './Icons'
import Link from 'next/link'

const Footer = () => {

  const pathname = usePathname()
  const pathsToMinimize = ["/verify-email", 'sign-in', 'sign-up']
  return (
    <footer className='bg-white flex-grow-0 border-t border-gray-200'>
      <MaxWidthWrapper>
        {pathsToMinimize.includes(pathname) ? null : (
          <div className='flex flex-col gap-3 justify-center items-center py-4'>
            <Icons.logo className='h-12 w-auto' />
            <div className='flex flex-col items-center justify-center gap-2 text-center'>
              <h2 className='font-medium'>Become a seller</h2>
              <p className='text-sm text-muted-foreground'>If you&apos;d like to sell high-quality digital products you can do so in minutes.{' '} 
                <Link href={'/sign-in?as=seller'} className='whitespace-nowrap font-medium text-black hover:text-blue-400 hover:underline hover:underline-offset-2'>
                Get started &rarr;
                </Link>
              </p>
            </div>
            <div className='text-muted-foreground text-sm'> 
              <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
            </div>
            <div className='flex items-center gap-8 text-sm text-muted-foreground'>
              <Link href='#' className='hover:text-blue-400'>Terms</Link>
              <Link href='#' className='hover:text-blue-400' >Cookie Policy</Link>
              <Link href='#' className='hover:text-blue-400'>Cookie Policy</Link>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer