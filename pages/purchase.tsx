import { StyledForm } from "@/components/StyledForm";
import { ReportRequest, ReportResponse } from "@/interfaces/eventReport";
import { prisma } from "@/lib/api/db";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Student } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { MutableRefObject, SyntheticEvent, useState, useRef, RefObject } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

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
    const [idFormData, setIdFormData] = useState("");

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            id: { value: string }
        };

        const endpoint = `/api/student/${target.id.value}`
        const studentResponse = await fetch(endpoint);
        const studentInfo: Student = await studentResponse.json();
        console.log(studentInfo)

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
        }

        setStudent(studentInfo);
        setIdFormData("");
    }

    return (
        <Box width="45rem" mx="auto" display="flex" justifyItems="center" flexDirection="column">
            <Typography fontWeight="bold" variant="h4" align="center" mt={5}>Turnstile</Typography>
            <Typography variant="caption" align="center" mt={0.5}>Purchase</Typography>
            <Box display="flex" flexDirection="row" mx="auto" width="100%">
                <StyledForm onSubmit={handleSubmit}>
                    <TextField value={idFormData} onChange={e => setIdFormData(e.target.value)} label="5 Digit Student ID" name="id" variant="standard" sx={{ width: "100%", mt: 1 }} inputRef={input => input && input.focus()} />
                </StyledForm>
            </Box>
            <Box display="flex" flexDirection="row" mx="auto" mt={2} width="100%" justifyContent="space-between">
                <Button component={Link} href="/namecheckin" variant="contained">SWITCH TO NAME CHECKIN</Button>
                <Button component={Link} href="/idcheckin" variant="contained">SWITCH TO ID CHECKIN</Button>
            </Box>
        </Box>
    )
}