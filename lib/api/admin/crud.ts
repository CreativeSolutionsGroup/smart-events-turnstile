import { prisma } from "../db";

export const readAdminByEmail = async (email: string) => {
  return await prisma.admin.findFirst({ where: { email } });
}