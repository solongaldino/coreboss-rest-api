import { PrismaClient } from "@prisma/client";
import { TPrismaClientProvider } from "../types";
const PrismaClientProvider: TPrismaClientProvider = new PrismaClient();
export default PrismaClientProvider;
