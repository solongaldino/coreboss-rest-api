import { Prisma, PrismaClient } from "@prisma/client";

export type AsyncFunTransaction = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
>;

export type Connection = PrismaClient | AsyncFunTransaction;

export type ModelsUncapitalize = Uncapitalize<Prisma.ModelName>;

export type TPrismaClientProvider = PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>;
