import { Student } from "@prisma/client";
import { prisma } from "../db"

export const readOneByProxId = async (evt: String, prox: string) => {
    return await prisma.registeration.findMany({ 
        where: { 
            AND: [
                { id: evt },
                { registrations: {
                    studentId: prox
                } }
        ]} 
    });
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