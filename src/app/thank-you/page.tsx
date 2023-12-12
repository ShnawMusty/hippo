import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PaymentStatus from "@/components/PaymentStatus";
import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { getServerSideUser } from "@/lib/payload-utils";
import { formatPrice } from "@/lib/utils";
import { Product, ProductFile, User } from "@/payload-types";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const ThankYouPage = async ({searchParams}: PageProps ) => {
  const orderId = searchParams.orderId;

  const nextCookies = cookies()

  const user = await getServerSideUser(nextCookies);

  const payload = await getPayloadClient();

  const {docs: orders} = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      id: {
        equals: orderId
      }
    }
  });

  const [order] = orders;

  if (!order) return notFound();

  const orderUserId = typeof order.user === 'string' ? order.user : order.user.id;

  if (orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`);
  };

  const products = order.products as Product[];

  const subtotal = products.reduce((total, product) => {
    return total + product.price
  }, 0);

  const fee = 1;

  return (
    <MaxWidthWrapper>
    <main className="relative lg:min-h-full ">
    <div className="hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
      <Image src='/checkout-thank-you.jpg' fill alt="thank you for your order" className="object-cover object-center" />
    </div>

    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-26 xl:gap-x-24">
    <div className="flex flex-col gap-6 lg:col-start-2">
      <section className="flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-blue-600">Order successful</p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Thanks for ordering</h1>
          {order._isPaid ? (
            <p className="text-base text-muted-foreground">
            Your order was processed and your assets are available to download below. We&apos;ve sent a receipt and order details to <span className="text-gray-900">{user.email}</span>.
            </p>
          ) : (
            <p className="text-base text-muted-foreground">
              We appreciate your order, and we&apos;re currently processing it. So hang tight and we&apos;ll send you confirmation very soon!
            </p>
          )}          
        </div>

        <div className="space-y-1 font-medium mt-4">
          <p className="text-muted-foreground">Order ID:</p>
          <p className="text-gray-900">{order.id}</p>
        </div>
      </section>

      <ul className="pt-6 divide-y border-t border-gray-200 font-medium text-muted-foreground">
        {(order.products as Product[]).map((product) => {
          const label = PRODUCT_CATEGORIES.find(({value}) => value === product.category)?.label;

          const downloadUrl = (product.product_files as ProductFile).url as string;

          const {image} = product.images[0];

          return (
            <li key={product.id} className="flex gap-6 pb-6">
              <span className="relative h-24 w-24 flex items-center justify-center">
                {typeof image !== 'string' && image.url ? (
                  <Image src={image.url} alt={product.name} fill className="object-cover object-center rounded-md bg-gray-100" />
                ) : null}
              </span>

              <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-900">
                    {product.name}
                  </h1>
                  <p className="text-sm">
                    Category: {label}
                  </p>
                </div>
                {order._isPaid ? (
                  <a href={downloadUrl} download={product.name} className="text-blue-600 hover:underline underline-offset-2">
                  Download asset
                </a>
                ) : null}                
              </div>
              <p className=" ml-auto font-medium text-gray-900">{formatPrice(product.price)}</p>
            </li>
          )
        })}
      </ul>

      <section className="flex flex-col gap-4 pt-6 border-t border-gray-200 text-muted-foreground ">
        <div className="flex items-center justify-between">
          <p>Subtotal</p>
          <p className="text-gray-900">{formatPrice(subtotal)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Transaction Fee</p>
          <p className="text-gray-900">{formatPrice(fee)}</p>
        </div>
        <div className="flex items-center justify-between pt-6 border-t border-gray-200 text-gray-900">
          <p>Total</p>
          <p>{formatPrice(subtotal + fee)}</p>
        </div>
      </section>

      <PaymentStatus isPaid={order._isPaid} orderEmail={(order.user as User).email} orderId={order.id} />

      <div className="border-t border-gray-200 text-right py-6">
        <Link href="/products" className="font-medium text-blue-600 hover:text-blue-500 hover:underline hover:underline-offset-2">
          Continue Shopping &rarr;
        </Link>
      </div>
    </div>
    </div>
    </main>
    </MaxWidthWrapper>
  )
}

export default ThankYouPage