import { z } from "zod";
import { authRouter } from "./authRouter";
import { publicProcedure, router } from "./trpc";
import { QueryValidator } from "../lib/validators/queryValidator";
import { getPayloadClient } from "../get-payload";
import { paymentRouter } from "./paymentRouter";

export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,

  getInfiniteProducts: publicProcedure.input(z.object({
    limit: z.number().min(1).max(100),
    cursor: z.number().nullish(),
    query: QueryValidator
  })).query(async ({input}) => {
    const { query, cursor } = input;

    const {sort, limit, ...queryOptions} = query;

    const page = cursor || 1;

    const parsedQueryOptions: Record<string, { equals: string }> = {};

    Object.entries(queryOptions).forEach(([key, value]) => {
      parsedQueryOptions[key] = {
        equals: value
      }
    })

    const payload = await getPayloadClient();

    const { docs: items, hasNextPage, nextPage } = await payload.find({
      collection: "products",
      where: {
        approvedForSale: {
          equals: 'approved'
        },
        ...parsedQueryOptions
      },
      depth: 1,
      sort,
      limit,
      page,
    });

    return { 
      items,
      nextPage: hasNextPage ? nextPage : null
    }
  })
})


export type AppRouter = typeof appRouter