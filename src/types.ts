import { Prisma, PrismaClient } from "@prisma/client";

export type AsyncFunTransaction = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
>;

export type Connection = PrismaClient | AsyncFunTransaction;

type ModelsUncapitalize = Uncapitalize<Prisma.ModelName>;
