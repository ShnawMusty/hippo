'use client'

import { trpcReact } from "@/trpc/client"
import { Loader2, XCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "./ui/button"

interface VerifyEmailProps {
  token: string
}

const VerifyEmail = ({token}: VerifyEmailProps) => {

  const { data, isLoading, isError} = trpcReact.auth.verifyEmail.useQuery({
    token
  })

  if (isError) {
    return (
      <section className="flex flex-col items-center justify-center gap-3 ">
        <XCircle  className="h-8 w-8 text-red-500"/>
        <h3 className="font-semibold text-xl">There was a problem</h3>
        <p className="text-base text-muted-foreground">This token is not valid or might be expired. Please try again.</p>
      </section>
    )
  }

  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center gap-3 ">
        <Loader2  className="animate-spin h-8 w-8 text-zinc-500"/>
        <h3 className="font-semibold text-xl">Verifying...</h3>
        <p className="text-base text-muted-foreground">This won&apos;t take long.</p>
      </section>
    )
  }

  if (true) {
    return (
      <section className="flex flex-col items-center justify-center gap-4">
        <span className="relative flex items-center justify-center w-60 h-60">
          <Image src="/hippo-email-sent.png" alt="the email was sent" fill />
        </span>
        <h3 className="font-semibold text-xl">You&apos;re all set!</h3>
        <p className="text-muted-foreground text-base">
          Thank you for verifying your email
        </p>
        <Link href="/sign-in" className={buttonVariants()}>Sign in</Link>
      </section>
    )
  }
}

export default VerifyEmail