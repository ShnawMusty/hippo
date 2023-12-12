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
    refetchInterval: (data) => data?.isPaid ? false : 1000 
  })

  useEffect(() => {
    if (data?.isPaid) router.refresh(); 
  }, [data?.isPaid, router])

  return (
    <div>

    </div>
  )
}

export default PaymentStatus