import CheckinCard from "@/components/CheckinCard";
import { Box, Typography, TextField, Button } from "@mui/material";
import { readAdminByEmail } from "@/lib/api/admin";
import { Student } from "@prisma/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { StyledForm } from "@/components/StyledForm";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    const user = await readAdminByEmail(session?.user?.email ?? "");

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

export default function NameCheckIn() {
    const [students, setStudents] = useState<Array<Student>>([]);
    const [idFormData, setIdFormData] = useState("");

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            name: { value: string }
        };

        const endpoint = `/api/student?name=${target.name.value}&evt=36a26786-1f41-46fa-b90b-5b09dc226d67`
        const response = await fetch(endpoint);
        console.log(response)
        const studentsInfo = await response.json();
        setStudents(studentsInfo);
        setIdFormData("");
    }

    return (
        <Box width="45rem" mx="auto" display="flex" justifyItems="center" flexDirection="column">
            <Typography fontWeight="bold" variant="h4" align="center" mt={5}>Turnstile</Typography>
            <Typography variant="caption" align="center" mt={0.5}>Check In</Typography>
            <Box display="flex" flexDirection="row" mx="auto" width="100%">
                <StyledForm onSubmit={handleSubmit}>
                    <TextField name="name" label="Last Name" variant="standard" sx={{ width: "100%", mt: 1 }} inputRef={input => input && input.focus()} value={idFormData} onChange={e => setIdFormData(e.target.value)} />
                </StyledForm>
            </Box>
            {students.length !== 0 ?
                students.map((student, i) => <CheckinCard student={student} checkIn={() => alert("Checked in")} key={i} />) :
                <Typography variant="caption" align="center">Press enter to search.</Typography>
            }
            <Box display="flex" flexDirection="row" mt={2} width="100%" justifyContent="space-between">
                <Button component={Link} href="/idcheckin" variant="contained">USE 5 DIGIT ID</Button>
                <Button component={Link} href="/purchase" variant="contained">SWITCH TO PURCHASE</Button>
            </Box>
        </Box>
    )
}