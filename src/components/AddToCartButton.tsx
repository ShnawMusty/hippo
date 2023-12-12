'use client'

import { Product } from '@/payload-types'
import { Button } from './ui/button'
import { useCart } from '@/hooks/use-cart'
import { useEffect, useState } from 'react'

const AddToCartButton = ({product}: {product: Product}) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(false)
    }, 2000);

    return () => clearTimeout(timer);
  }, [isSuccess]);

  return (
    <Button className='w-full' size='lg' 
      onClick={() => {
      addItem(product);
      setIsSuccess(true)
    }}>
      {isSuccess ? 'Added to cart!' : 'Add to cart'}
    </Button>
  )
}

export default AddToCartButton