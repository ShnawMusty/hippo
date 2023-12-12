import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from ".";

export const trpcReact = createTRPCReact<AppRouter>({})