import { authCredentialValidator } from "../lib/validators/credentialsValidator";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const authRouter = router({
  createPayloadUser: publicProcedure.input(authCredentialValidator).mutation(async ({input}) => {
    const { email, password } = input;

    // check if user already exists
    try {
      const payload = await getPayloadClient();
      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email
          }
        }
      });
  
      if (users.length !== 0) {
        throw new TRPCError({ code: 'CONFLICT'})
      }
  
      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          role: 'user'
        }
      })
  
      return {success: true, sentToEmail: email};
    } catch (error) {
      return null;
    }
    
  }),

  verifyEmail: publicProcedure.input(z.object({token: z.string() })).query(async ({input}) => {
    const { token } = input;
    try {
      const payload = await getPayloadClient();

    const isVerified = await payload.verifyEmail({
      collection: "users",
      token
    });

    if (!isVerified) {
      throw new TRPCError({ code: 'UNAUTHORIZED'})
    };

    return {success: true}
    } catch (error) {
      return null
    }
  }),

  signIn: publicProcedure.input(authCredentialValidator).mutation(async ({input, ctx}) => {
    const {email, password} = input;
    const {req, res} = ctx;
    
    try {
      const payload = await getPayloadClient();
      await payload.login({
        collection: 'users',
        data: {
          email,
          password
        },
        res 
      })

      return {success: true};

    } catch (error) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

  })
  
})