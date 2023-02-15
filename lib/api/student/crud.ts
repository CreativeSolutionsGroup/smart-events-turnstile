import { prisma } from "../db"

export const readOneByProxId = async ( proxId: string ) => {
    return await prisma.student.findFirst({where: { prox: proxId }});
}