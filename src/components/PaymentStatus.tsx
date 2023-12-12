'use client'

import { trpcReact } from "@/trpc/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface PaymentStatusProps {
  orderEmail: string
  orderId: string 
  isPaid: boolean
}

const PaymentStatus = ({orderEmail, orderId, isPaid}: PaymentStatusProps) => {
  const router = useRouter();

  const {data} = trpcReact.payment.pollOrderStatus.useQuery({orderId}, {
    enabled: isPaid === false,
    refetchInterval: (data) => (data?.isPaid ? false : 1000)
  })

  useEffect(() => {
    if (data?.isPaid) router.refresh(); 
  }, [data?.isPaid, router])

  return (
    <section className="grid grid-cols-2 gap-4 text-sm text-gray-600">
      <div>
        <p>Shipping to</p>
        <p className="text-gray-900 font-medium">{orderEmail}</p>
      </div>
      <div className="ml-auto">
        <p>Order Status</p>
        <p className="text-gray-900 font-medium">{isPaid ? 'Payment Successful' : 'Pending payment'}</p>
      </div>
    </section>
  )
}

export default PaymentStatus