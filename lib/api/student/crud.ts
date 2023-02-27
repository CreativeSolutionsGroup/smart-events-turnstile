import { Student, Registration, Event } from "@prisma/client";
import { prisma } from "../db"

export const readOneByProxId = async (prox: string) => {
    return await prisma.student.findFirst({ where: { prox } });
}

export const readFuzzyByName = async (name: string) => {
    return await prisma.student.findMany({
        where: {
            name: {
                contains: name
            }
        }
    })
}

export const updateStudentRecord = async ( student: Student) => {
    await prisma.student.update({
        where: {
            id: student.id
        },
        data: {
          email: student.email,
        },
    })
}

export const createRegistration = async ( student: Student, evt: Event ) => {
    const reggie = await prisma.registration.create({
        data: {
            studentId: student.id,
            eventId: evt.id,
        }
    })
    return reggie;
}