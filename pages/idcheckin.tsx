import CheckinCard from "@/components/CheckinCard";
import { prisma } from "@/lib/api/db";
import { Box, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { Student } from "@prisma/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FormEvent, SyntheticEvent, useState } from "react";
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

        const endpoint = `/api/student/${target.id.value}?evt=36a26786-1f41-46fa-b90b-5b09dc226d67`
        const response = await fetch(endpoint);
        const studentInfo = await response.json();
        setStudent(studentInfo);
    }

    return (
        <>
            <Typography fontWeight="bold" variant="h4">Turnstile</Typography>
            <Typography variant="caption">Check In</Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <form onSubmit={handleSubmit}>
                    <TextField label="5 Digit Student ID" name="id" variant="standard" />
                    <Button type="submit">Search</Button>
                </form>
                <Link href="/namecheckin">
                    <Button>
                        USE LAST NAME
                    </Button>
                </Link>
            </Box>
            {student ?
                <CheckinCard student={student} checkIn={() => alert("User has checked in.")} /> :
                <p>Press enter to search.</p>}

        </>
    )
}