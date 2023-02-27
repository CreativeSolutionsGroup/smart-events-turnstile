import CheckinCard from "@/components/CheckinCard";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { readAdminByEmail } from "@/lib/api/admin";
import { Student } from "@prisma/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

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

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            name: { value: string }
        };

        const endpoint = `/api/student?name=${target.name.value}`
        const response = await fetch(endpoint);
        const studentInfo = await response.json();
        setStudents(studentInfo);
    }

    return (
        <Box width="55rem" mx="auto" display="flex" justifyItems="center" flexDirection="column">
            <Typography fontWeight="bold" variant="h4" align="center" mt={6}>Turnstile</Typography>
            <Typography variant="caption" align="center" mt={1}>Check In</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", mx: "auto", maxWidth: "43rem" }}>
                <form onSubmit={handleSubmit}>
                    <TextField name="name" label="Last Name" variant="standard" sx={{ width: "36rem", mt: 1 }} />
                    <Button type="submit" variant="contained" sx={{ mt: 2, ml: 0.5 }}>SUBMIT</Button>
                </form>
            </Box>
            {students.length !== 0 ? students.map((student, i) => <CheckinCard student={student} checkIn={() => alert("Checked in")} key={i} />) : <Typography>Press enter to search.</Typography>}
            <Box sx={{ mt: 2, mx: "auto", maxWidth: "43rem" }}>
                <Button component={Link} href="/idcheckin" variant="contained">USE 5 DIGIT ID</Button>
                <Button variant="contained" sx={{ alignSelf: "flex-end" }}>SWITCH TO PURCHASE</Button>
            </Box>
        </Box>
    )
}

// add to line 17: onSubmit={handleSubmit}
// add to line 18: name="lastName"
// add to line 23: component={Link} href="/idcheckin"