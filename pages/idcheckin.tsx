import CheckinCard from "@/components/CheckinCard";
import { prisma } from "@/lib/api/db";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { Student } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
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
export default function IdCheckIn() {
    const [student, setStudent] = useState(null);

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            id: { value: string }
        };

        const endpoint = `/api/student/${target.id.value}`
        const response = await fetch(endpoint);
        const studentInfo = await response.json();
        setStudent(studentInfo);
    }

    return (
        <>
            <Typography fontWeight="bold" variant="h4" align="center" mt={6}>Turnstile</Typography>
            <Typography variant="caption" align="center" mt={1}>Check In</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", mx: "auto", maxWidth: "43rem" }}>
                <form onSubmit={handleSubmit}>
                    <TextField label="5 Digit Student ID" name="id" variant="standard" sx={{ width: "36rem", mt: 1 }}/>
                    <Button type="submit" variant="contained" sx={{ mt: 2, ml: 0.5 }}>SUBMIT</Button>
                </form>
            </Box>
            {student ?
                <CheckinCard student={student} checkIn={() => alert("User has checked in.")} /> :
                <p>Press enter to search.</p>}
            <Box sx={{ mt: 2, mx: "auto", maxWidth: "43rem"}}>
                <Button component={Link} href="/namecheckin" variant="contained">USE LAST NAME</Button>
                <Button variant="contained" sx={{ alignSelf: "flex-end" }}>SWITCH TO PURCHASE</Button>
            </Box>
        </>
    )
}