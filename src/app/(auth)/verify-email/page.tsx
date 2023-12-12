import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}


const VerifyEmailPage = ({searchParams}: PageProps) => {

  const token = searchParams.token;
  const toEmail = searchParams.to;

  return (
    <section className="container flex flex-col items-center justify-center pt-20 lg:px-0">
      {token && typeof token === 'string' ? (
        <div className="flex items-center justify-center">
          <VerifyEmail token={token} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 h-full w-full mx-auto">
          <span className="relative w-60 h-60 flex items-center justify-center">
            <Image src="/hippo-email-sent.png" alt="hippo email sent image" fill />
          </span>
          <h3 className="font-semibold text-2xl" >Check your email</h3>
          {toEmail ? (
            <p className="text-muted-foreground text-center">We&apos;ve sent a verification link to <span className="font-semibold text-black">{toEmail}</span>.
            </p>
          ) : (
            <p className="text-muted-foreground text-center">We&apos;ve sent a verification link to your email.</p>
          )}
      </div>  
      )}
    </section>
  )
}

export default VerifyEmailPage;