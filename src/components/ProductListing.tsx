'use client'

import { Product } from "@/payload-types"
import { useEffect, useState } from "react"
import { Skeleton } from "./ui/skeleton"
import Link from "next/link"
import ImageSlider from "./ImageSlider"
import { PRODUCT_CATEGORIES } from "@/config"
import { cn, formatPrice } from "@/lib/utils"

interface ProductListingProps {
  product: Product | null
  index: number
}

const ProductListing = ({product, index}: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  const validCategoryLabel = PRODUCT_CATEGORIES.find(({value}) => value === product?.category)?.label;

  const validUrls = product?.images.map(({image}) => {
    if (typeof image === 'string') return image;
    
    return image.url;
    
  }).filter((url) => Boolean(url)) as string[]

  if (!product || !isVisible) return <ProductPlaceholder/>

  if (isVisible && product) {
    return (
      <Link href={`/product/${product.id}`} className={cn('invisible h-full w-full group/main', {
        'visible animate-in fade-in-5': isVisible
      })}>
        <div className="flex flex-col gap-2 w-full"> 
        <ImageSlider urls={validUrls}/>
        <h3 className="font-medium text-sm text-gray-700 mt-2">{product.name}</h3>
        <p className="text-sm text-gray-500">{validCategoryLabel}</p>
        <p className="font-medium text-sm text-gray-900" >{formatPrice(product.price)}</p>
        </div>
      </Link>
    )
  }
}

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="w-full h-full" />
      </div>
      <Skeleton className="mt-2 w-2/3 h-4 rounded-lg" />
      <Skeleton className="w-16 h-4 rounded-lg" />
      <Skeleton className="w-12 h-4 rounded-lg" />
    </div>
  )
}

export default ProductListing