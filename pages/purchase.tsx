import { StyledForm } from "@/components/StyledForm";
import { ReportRequest, ReportResponse } from "@/interfaces/eventReport";
import { prisma } from "@/lib/api/db";
import { Box, FilledInput, FormControl, InputAdornment, InputLabel, Paper, Typography } from "@mui/material";
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

const AutofillTextField = ({ value, name }: { value: string, name: string }) => {
    return (
        <FormControl variant="filled" sx={{ flexGrow: 1, margin: 1 }}>
            <InputLabel htmlFor="filled-first-name" sx={{ color: "#1976d2" }}>{name}</InputLabel>
            <FilledInput
                value={value}
                id="filled-first-name"
                startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
        </FormControl>
    )
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

    const studentCheckin = async (e: SyntheticEvent) => {
        await fetch(`/api/register?id=${student.id}&evt=36a26786-1f41-46fa-b90b-5b09dc226d67`, {
            method: "POST"
        })
    }

    return (
        <Box width="45rem" mx="auto" display="flex" justifyItems="center" flexDirection="column">
            <Typography fontWeight="bold" variant="h4" align="center" mt={5}>Turnstile</Typography>
            <Typography variant="caption" align="center" mt={0.5}>Purchase</Typography>
            <Box display="flex" flexDirection="column" mx="auto" width="100%">
                <StyledForm onSubmit={handleSubmit}>
                    <TextField value={idFormData} onChange={e => setIdFormData(e.target.value)} label="5 Digit Student ID" name="id" variant="standard" sx={{ width: "100%", mt: 1 }} inputRef={input => input && input.focus()} />
                </StyledForm>
                <Paper sx={{ marginTop: 1 }}>
                    <StyledForm style={{ display: "flex", flexDirection: "column" }} onSubmit={studentCheckin}>
                        <Box display={"flex"}>
                            <AutofillTextField value={student.name?.split(" ")[1]} name="First Name" />
                            <AutofillTextField value={student.name?.split(" ")[0].slice(0, -1)} name="Last Name" />
                        </Box>
                        <AutofillTextField value={(student.year ?? "").toUpperCase().charAt(0) + (student.year ?? "").toLowerCase().slice(1)} name="Year" />
                        <AutofillTextField value={student.email ?? ""} name="Email" />
                        <AutofillTextField value={student.redwoodId ?? ""} name="7 Digit Student ID" />
                        <Button sx={{ width: 100, margin: 1 }} variant="outlined" type="submit">Submit</Button>
                    </StyledForm>
                </Paper>
            </Box>
            <Box display="flex" flexDirection="row" mx="auto" mt={2} width="100%" justifyContent="space-between">
                <Button component={Link} href="/namecheckin" variant="contained">SWITCH TO NAME CHECKIN</Button>
                <Button component={Link} href="/idcheckin" variant="contained">SWITCH TO ID CHECKIN</Button>
            </Box>
        </Box>
    )
}