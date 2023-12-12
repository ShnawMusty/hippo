'use client'

import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react"
import NavItem from "./NavItem";
import useOnClickOutside from "@/hooks/use-on-click-outside";

const NavItems = () => {

  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null)
      }
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])

  useOnClickOutside(navRef, () => setActiveIndex(null))

  return (
    <section className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, index) => {
        const handleOpen = () => {
          if (activeIndex === index) {
            setActiveIndex(null)
          } else {
            setActiveIndex(index)
          }
        };

        const isOpen = activeIndex === index;

        return (
          <NavItem key={category.value} category={category} isOpen={isOpen} handleOpen={handleOpen} isAnyOpen={isAnyOpen} />
        )
      })}
    </section>  
  )
}

export default NavItems