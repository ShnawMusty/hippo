import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Leaf, CheckCircle, ArrowDownToLine } from "lucide-react";
import ProductReel from "@/components/ProductReel";

const perks = [
  {
    name: 'Insant Delivery',
    Icon: ArrowDownToLine,
    description: 'Get your assets delivered to your email in seconds and download them right away.'
  },
  {
    name: 'Guaranteed Quality',
    Icon: CheckCircle,
    description: 'Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.'
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description: "We've pledged 1% of sales to the preservation and restoration of the natural environment"
  },
]

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <main className="flex flex-col gap-6 items-center max-w-3xl mx-auto py-20 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900">
            Your marketplace for high-quality{" "}
            <span className="text-blue-600">digital assets</span>.
          </h1>

          <p className="text-muted-foreground text-lg max-w-prose">
            Welcome to DigitalHippo. Every asset on our platform is verified by
            out team to ensure your highest quality standards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4" >
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="ghost">Our quality promise &rarr; </Button>
          </div>

          {/* TODO: LIST PRODUCTS */}
          <ProductReel title="Brand new" href="/products" query={{sort: 'desc', limit: 4}} />
        </main>
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-x-6 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <section key={perk.name} className="text-center md:text-left lg:text-center md:flex md:items-center lg:block">
                <div className="md:flex-shrink-0 flex justify-center">
                  <span className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-900">
                  {<perk.Icon className="h-1/3 w-1/3" />}
                  </span>
                </div>

                <div className="mt-6 md:mt-0 lg:mt-6 md:ml-4 lg:ml-0">
                  <h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{perk.description}</p>
                </div>
              </section>
            ))}
          </div>

        </MaxWidthWrapper>
      </section>
    </>
  );
}