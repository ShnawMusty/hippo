'use client'

import { ChevronDown } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { PRODUCT_CATEGORIES } from "@/config"

type Category = (typeof PRODUCT_CATEGORIES)[number]

interface NavItemProps {
  category: Category
  handleOpen: () => void
  isOpen: boolean
  isAnyOpen: boolean

}

const NavItem = ({category, isOpen, isAnyOpen, handleOpen }: NavItemProps) => {
  return (
    <section className="flex">
      <div className="relative flex items-center">
        <Button onClick={handleOpen} variant={isOpen ? 'secondary' : 'ghost'} className="gap-1.5">
          {category.label}
          <ChevronDown className={cn("h-4 w-4 transition-all text-muted-foreground", {
            '-rotate-180': isOpen
          })} />
        </Button>
      </div>

      {isOpen ? (
        <section className={cn("absolute inset-x-0 top-full text-sm text-muted-foreground", {
          "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen
        })}>
          <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden='true' />

          <div className="relative bg-white">

            <div className="mx-auto max-w-7xl px-8">

            {/* <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16" > */}

              <div className=" grid grid-cols-3 gap-x-8 py-12">
                {category.featured.map((item) => (
                  <div key={item.name} className="relative group text-base sm:text-sm">
                    <span className="relative aspect-video overflow-hidden rounded-lg bg-gray-100  flex items-center justify-center">
                      <Image  src={item.imageSrc} alt="product category image" className="object-cover h-[100%] w-[100%] object-center" fill />
                    </span>
                    <Link href={item.href} className="block mt-6 font-medium text-gray-900 ">
                      {item.name}
                    </Link>
                    <p className="mt-1" aria-hidden='true'>Shop now</p>
                  </div>
                ))}
              </div>
            {/* </div> */}
            </div>
          </div>
        </section>
      ) : null}
    </section>
  )
}

export default NavItem