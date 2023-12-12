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
import { useRouter } from 'next/navigation'

const Page = () => {

  const router = useRouter()

  const { 
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<TauthCredentialValidator>({
    resolver: zodResolver(authCredentialValidator)
  });
  
  const { mutate, isLoading} = trpcReact.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === 'CONFLICT') {
        toast.error('This email is already in use. Sign in instead?');
        return;
      };
      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);
        return;
      }
      toast.error('Something went wrong.');
    },
    // @ts-ignore
    onSuccess: ({sentToEmail}) => {
      toast.success(`Verification email sent to ${sentToEmail}`);
      router.push('/verify-email?to='+sentToEmail)
    },
  })

  const onSubmit = ({email, password}: TauthCredentialValidator) => {
    mutate({email, password })
  }

  return (
    <>
    <div className='container relative flex flex-col items-center justify-center pt-20 lg:px-0'>
      <section className='flex flex-col items-center justify-center gap-5 w-full mx-auto sm:w-[350px]'>
        <div className='w-full flex flex-col items-center justify-center gap-1'>
          <Icons.logo className='w-20 h-20' />
          <h1 className='text-2xl font-bold'>Create an account</h1>
          <Link href="/sign-in" className={buttonVariants({ variant: "link"})}>
            Already have an account? Sign in
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
          <Button className='mt-2' disabled={isLoading} >Sign up</Button>
        </form>
      </section>
    </div>
    </>
  )
}

export default Page