'use client'

import { ShoppingCart } from "lucide-react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import CartItem from "./CartItem"
import { ScrollArea } from "./ui/scroll-area"
import { useEffect, useState } from "react"

const Cart = () => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, []);

  const { items } = useCart();

  const itemsCount = items.length;

  const cartTotal = items.reduce((prev, { product }) => prev + product.price, 0);

  const fee = 1;

  return (
    <Sheet>
      <SheetTrigger className="group flex items-center gap-2 p-2">
        <ShoppingCart className="w-6 h-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true"/>
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {isMounted ? itemsCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col pr-0">

        <SheetHeader>
          <SheetTitle>Cart ({itemsCount})</SheetTitle>
        </SheetHeader>

        {itemsCount > 0 ? (
          <section className="flex flex-col gap-4 w-full h-[95%] pr-6" >
            <ScrollArea className="flex-1 w-full rounded-md border p-4">
              {items.map(({product}) => (
                <CartItem key={product.id} product={product} />
              ))}
            </ScrollArea>
            <Separator/>
            <div className="flex flex-col gap-2 text-base">
              <div className="flex items-center">
                <p className="flex-1">Shipping</p>
                <span>Free</span>
              </div>
              <div className="flex items-center">
                <p className="flex-1">Transaction Fee</p>
                <span>{formatPrice(fee)}</span>
              </div>
              <div className="flex items-center">
                <p className="flex-1">Total</p>
                <span>{formatPrice(cartTotal + fee)}</span>
              </div>
            </div>

            <SheetFooter>
              <SheetTrigger asChild className="mt-4">
                <Link href="/cart" className={buttonVariants({className: 'w-full'})}>Continue to Checkout</Link>
              </SheetTrigger>
            </SheetFooter>
          </section>
        ) : (
          <div className="flex flex-col gap-4 h-full items-center justify-start mt-24">
            <span className="relative w-80 h-80 flex items-center justify-center text-muted-foreground">
              <Image src="/hippo-empty-cart.png" fill className="object-cover" alt="empty shopping cart hippo" aria-hidden='true'/>
            </span>
            <p className="text-xl" >Your cart is empty</p>
            <SheetTrigger asChild>
              <Link href="/products" className={buttonVariants({ variant: 'link', size:'sm', className: 'text-muted-foreground'})} >Add items to your cart to checkout</Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default Cart