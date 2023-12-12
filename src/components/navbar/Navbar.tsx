import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import Link from 'next/link'
import NavItems from './NavItems'
import { Icons } from '../Icons'
import { buttonVariants } from '../ui/button'
import Cart from '../Cart'
import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import UserAccountNav from '../UserAccountNav'

const Navbar = async () => {

  const nextCookies = cookies();
  const user = await getServerSideUser(nextCookies);
  
  return (
    <nav className='sticky top-0 inset-x-0 z-50 h-16'>
      <header className='relative bg-white'>
        <MaxWidthWrapper>
          <div className='border-b border-gray-200'>
            <section className='flex h-16 items-center'>
              {/* TODO: Mobile nav */}

              <span className='flex ml-4 lg:ml-0'>
                <Link href="/">
                  <Icons.logo className='h-10 w-10' />
                </Link>
              </span>

              <div className='hidden lg:block lg:self-stretch z-50 lg:ml-8' >
                <NavItems/>
              </div>

              <section className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-4'>
                  {user ? (
                    <UserAccountNav user={user} />
                  ) 
                  : (
                    <>
                      <Link href="/sign-in" className={buttonVariants({ variant: "ghost" })}>
                      Sign in
                      </Link>
                    
                      <span className='h-6 w-px bg-gray-200' aria-hidden="true"/>

                      <Link href="/sign-up" className={buttonVariants({ variant: "ghost"})}>
                      Create account
                      </Link>
                    </>
                  )}
                  <span className='h-6 w-px bg-gray-200' aria-hidden="true"/>

                  <Cart/>
                </div>
              </section>
            </section>
          </div>
        </MaxWidthWrapper>
      </header>
    </nav>
  )
}

export default Navbar