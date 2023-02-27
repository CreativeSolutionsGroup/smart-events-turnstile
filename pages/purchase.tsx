import { prisma } from "@/lib/api/db";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Student } from "@prisma/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { SyntheticEvent, useState } from "react"
import { ReportRequest, ReportResponse } from "@/interfaces/eventReport";
import PurchaseForm from "@/components/PurchaseForm";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    const user = await prisma.admin.findFirst({ where: { email: session?.user?.email ?? "" } });

    if (user) {
        return { props: {} }
    } else {
        return {
            redirect: {
                permanent: false,
                destination: "/api/auth/signin"
            }
        }
    }
}



export default function Purchase() {

    const [student, setStudent] = useState<Student>({} as Student);

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            id: { value: string }
        };

        const endpoint = `/api/student?id=${target.id.value}`
        const studentResponse = await fetch(endpoint);
        let studentInfo: Student = await studentResponse.json();

        if (studentInfo.email == null && student != null) {
            let req = {} as ReportRequest
            req.checkins = [{ createdAt: "", studentId: target.id.value }]
            const reportResponse = await fetch("/api/eventReport", {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(req)
            })
            const report: ReportResponse[] = await reportResponse.json();

            studentInfo.email = report[0].Email

            fetch("/api/student", {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(studentInfo)
            })
        } else {
            // TODO: Maybe somewhere in this form is where we get the registration being added to the student?
            //       Or maybe it's stored in the session or something
            
            await fetch(endpoint, {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(studentInfo)
            });
        }

        setStudent(studentInfo);

    }


    return (
        <>
            <Typography fontWeight="bold" variant="h4">Turnstile</Typography>
            <Typography variant="caption">Purchase</Typography>
            <Box>
                <form onSubmit={handleSubmit}>
                    <TextField label="5 Digit Student ID" name="id" variant="standard" />
                    <Button type="submit" variant="contained">SUBMIT</Button>
                </form>

                {Object.keys(student).length != 0 && <PurchaseForm student={student} />}


            </Box>
        </>
    )
}