'use client'

import { Icons } from '@/components/Icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { TauthCredentialValidator, authCredentialValidator } from '@/lib/validators/credentialsValidator'
import { trpcReact } from '@/trpc/client'
import { toast } from 'sonner'
import { ZodError } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'

const Page = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const isSeller = searchParams.get('as') === "seller";
  const origin = searchParams.get('origin');  

  const continueAsSeller = () => {
    router.push('?as=seller');
  }

  const continueAsBuyer = () => {
    router.replace('/sign-in', undefined)
  }

  const { 
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<TauthCredentialValidator>({
    resolver: zodResolver(authCredentialValidator)
  });
  
  const { mutate: signIn, isLoading} = trpcReact.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success('Signed in Successfully');

      if (origin) {
        router.push(`/${origin}`);
        router.refresh();
        return
      };
      if (isSeller) {
        router.push('/sell');
        router.refresh();
        return
      };

      router.push('/');
      router.refresh();
    },
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        toast.error('Invalid email or password')
      };
    } 
  })

  const onSubmit = ({email, password}: TauthCredentialValidator) => {
    signIn({email, password })
  }

  return (
    <>
    <div className='container relative flex flex-col items-center justify-center pt-20 lg:px-0'>
      <section className='flex flex-col items-center justify-center gap-5 w-full mx-auto sm:w-[350px]'>
        <div className='w-full flex flex-col items-center justify-center gap-1'>
          <Icons.logo className='w-20 h-20' />
          <h1 className='text-2xl font-bold'>Sign in to your {isSeller && 'seller'} account</h1>
          <Link href="/sign-up" className={buttonVariants({ variant: "link"})}>
            Don&apos;t have an account? Sign up
            <ArrowRight className='h-4 w-4 ml-1.5' />
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='w-full grid gap-2'>
          <div className='grid gap-2 py-2'>
            <Label htmlFor='email' >Email</Label>
            <Input {...register("email")} 
              type='text'
              placeholder='you@example.com'
              className={cn({
                "focus-visible:ring-red-500": errors.email,
                })}/>
            {errors?.email && (
              <p className='text-sm text-red-500'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className='grid gap-2 py-2'>
            <Label htmlFor='password' >Password</Label>
            <Input {...register("password")} placeholder='Password'
              type='password'
              className={cn({
                "focus-visible:ring-red-500": errors.password,
                })}/>
            {errors?.password && (
              <p className='text-sm text-red-500'>
                {errors.password.message}
              </p>
            )}
          </div>
          <Button className='mt-2' disabled={isLoading}>Sign in</Button>
        </form>

        <div className='relative flex items-center justify-center w-full'>
          <span className='absolute border-t w-full'/>
          <span className='relative px-2 text-muted-foreground bg-background' >OR</span>
        </div>
        {isSeller ? (
          <Button onClick={continueAsBuyer} variant="secondary" disabled={isLoading} className='w-full'>Continue as customer</Button>
        ) : (
          <Button onClick={continueAsSeller} variant="secondary" disabled={isLoading} className='w-full'>Continue as seller</Button>
        )}
      </section>
    </div>
    </>
  )
}

export default Page