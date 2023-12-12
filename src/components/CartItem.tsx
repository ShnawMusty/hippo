import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/payload-types"
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";

const CartItem = ({product}: {product: Product}) => {
  const { image } = product.images[0];

  const label = PRODUCT_CATEGORIES.find(({value}) => value === product.category)?.label;

  const { removeItem } = useCart()

  return (
    <div className="flex justify-between mb-6 border border-slate-100 rounded-xl p-1">
      <section className="flex gap-4 items-center">
        <div className="relative h-full w-full flex items-center justify-center aspect-square min-w-fit overflow-hidden rounded">
          {typeof image !== 'string' && image.url ? (
            <Image src={image.url} alt={product.name} fill className="object-cover" />
          ) : (
            <span className="flex items-center justify-center bg-secondary">
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </span>
          )} 
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="line-clamp-1 text-xl">{product.name}</h3>
          <p className="line-clamp-1 text-sm text-muted-foreground capitalize">{label}</p>
          <button className="flex items-center text-muted-foreground text-sm mt-3 text-red-400" onClick={() => removeItem(product.id)}>
            <X aria-hidden='true' className="w-4 h-4 mr-0.5" />
            Remove
          </button>
        </div>
      </section>
      <span className="font-medium text-sm line-clamp-1">
        {formatPrice(product.price)}
      </span>
    </div>
  )
}

export default CartItem