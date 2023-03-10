import { Student } from "@prisma/client";
import { useEffect, useState } from "react";
import { prisma } from "../db"

export const readOneByProxId = async (prox: string) => {
    return await prisma.student.findFirst({
        where: {
            prox
        }
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

export const updateStudentRecord = async (student: Student) => {


    await prisma.student.update({
        where: {
            id: student.id
        },
        data: {
            email: student.email,
        },
    })
}

export const getRegisteredById = async(evt: string, prox: string) => {
    return await prisma.student.findFirst({
        where: {
            prox,
            registrations: {
                some: {
                    event: {
                        id: evt
                    }
                }
            }
        }
    });
}

export const getRegisteredByName = async(evt: string, name: string) => {
    return await prisma.student.findMany({
        where: {
            name: {
                contains: name
            },
            registrations: {
                some: {
                    event: {
                        id: evt
                    }
                }
            }
        }
    });
}