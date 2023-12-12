"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { cn, formatPrice } from "@/lib/utils";
import { trpcReact } from "@/trpc/client";
import { Check, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartPage = () => {
  const { items, removeItem } = useCart();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  const router = useRouter();

  const productIds = items.map(({product}) => product.id); 

  const { mutate: createCheckoutSession, isLoading } = trpcReact.payment.createSession.useMutation({
    onSuccess: ({ url }) => {
      if (url) router.push(url)
    }
  })

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce(
    (prev, { product }) => prev + product.price,
    0
  );

  const fee = 1;

  return (
    
    <div className="max-w-2xl lg:max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 ">
        Shopping Cart
      </h1>

      <section className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <div
          className={cn("lg:col-span-7 mb-12 lg:mb-0", {
            "rounded-lg border-2 border-dashed border-zinc-200 p-12 h-96":
              isMounted && items.length === 0,
          })}
        >
          <h2 className="sr-only">Items in your shopping cart</h2>

          {isMounted && items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full w-full gap-3">
              <span className="relative h-40 w-40">
                <Image
                  src="/hippo-empty-cart.png"
                  alt="empty shopping cart hippo"
                  fill
                  loading="eager"
                  className="object-cover"
                />
              </span>
              <h3 className="font-semibold text-2xl">Your cart is empty</h3>
              <p className="text-muted-foreground text-center">
                Whoops! Nothing to show here yet.
              </p>
            </div>
          ) : null}

          <ScrollArea className="p-2 pr-3">
            <ul
            className={cn({
              "divide-y divide-gray-200 border-b border-t border-gray-200 space-y-6":
                isMounted && items.length > 0,
            })}
          >
            {isMounted &&
              items.map(({ product }) => {
                const label = PRODUCT_CATEGORIES.find(
                  (categ) => categ.value === product.category
                )?.label;
                const { image } = product.images[0];

                return (
                  <li key={product.id} className="flex justify-between gap-4">
                    <div className="flex gap-4">
                      <span className="relative h-24 w-24 sm:h-48 sm:w-48 rounded-md overflow-hidden">
                        {typeof image !== "string" && image.url ? (
                          <Image
                            src={image.url}
                            alt="product image"
                            fill
                            className="object-cover"
                          />
                        ) : null}
                      </span>

                      <div className="flex flex-col gap-3">
                        <Link
                          href={`/product/${product.id}`}
                          className="font-medium text-gray-700 hover:text-gray-800 mt-1"
                        >
                          {product.name}
                        </Link>
                        <p className="text-muted-foreground text-base">
                          Category: {label}
                        </p>
                        <p className="text-base text-gray-700 flex items-center">
                          <Check className="h-5 w-5 flex-shrink-0 text-green-500 mr-2" />
                          Eligible for instant delivery
                        </p>
                        <p className="font-medium text-gray-900 mt-2">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                    <Button
                      aria-label="remove product"
                      variant="ghost"
                      onClick={() => removeItem(product.id)}
                    >
                      <X aria-hidden="true" className="h-5 w-5 text-red-400" />
                    </Button>
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        </div>
        
        {isMounted && (
        <section className="rounded-lg space-y-4 bg-gray-50 px-4 sm:p-6 lg:col-span-5">
            <h2 className="font-medium text-gray-900 text-base">
              Order summary
            </h2>

            <div>
              <div className="flex items-center justify-between py-3">
                <p className="text-gray-600">Subtotal</p>
                <span className="font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice(cartTotal)
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 py-3">
                <p className="text-gray-600">Flat Transaction Fee</p>
                <span className="font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice(fee)
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 py-3">
                <p className="font-medium text-gray-900">Order Total</p>
                <span className="font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice(cartTotal + fee)
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </span>
              </div>
            </div>
            <Button className="w-full" size='lg' disabled={items.length === 0 || isLoading} onClick={() => createCheckoutSession({productIds})}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1.5"/>
              ) : null }
              Checkout
            </Button>
        </section>
        )}
      </section>
    </div>
    
  );
};

export default CartPage;
