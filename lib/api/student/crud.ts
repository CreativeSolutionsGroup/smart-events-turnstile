import { Student, Registeration } from "@prisma/client";
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

export const addRegistration = async ( student: Student, registration: Registeration ) => {
    // TODO: Figure out why the Registeration array doesn't show up in student
    await prisma.student.update({
        where: {
            id: student.id
        },
        data: {
            Registeration: {
                push: registration,
            },
        },
    })
}