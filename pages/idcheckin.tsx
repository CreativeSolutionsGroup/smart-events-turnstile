import CheckinCard from "@/components/CheckinCard";
import { StyledForm } from "@/components/StyledForm";
import { prisma } from "@/lib/api/db";
import { Box, Typography, TextField, Button } from "@mui/material";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import redirect from 'nextjs-redirect';
import Router from "next/router";

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
    const [event, setEvent] = useState("");
    useEffect(() => {
        if (sessionStorage.getItem('eventId') === null) {return}
        setEvent(sessionStorage.getItem('eventId')!)
    }, [])

    if (!event) {
        console.log("attempting to redirect")
        useEffect(() => {
            redirect('/eventselect');
            Router.replace("/eventselect", "/eventselect", { shallow: true });
        }, []);
    }

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            id: { value: string }
        };

        const endpoint = `/api/student/${target.id.value}?evt=${event}`
        const response = await fetch(endpoint);
        const studentInfo = await response.json();
        setStudent(studentInfo);
    }

    return (
        <Box width="45rem" mx="auto" display="flex" justifyItems="center" flexDirection="column">
            <Typography fontWeight="bold" variant="h4" align="center" mt={5}>Turnstile</Typography>
            <Typography mx="auto" variant="caption" align="center" mt={0.5}>Check In</Typography>
            <Box display="flex" flexDirection="row" mx="auto" width="100%">
                <StyledForm onSubmit={handleSubmit}>
                    <TextField label="5 Digit Student ID" name="id" variant="standard" sx={{ width: "100%", mt: 1 }}/>
                </StyledForm>
            </Box>
            {student ?
                <CheckinCard student={student} checkIn={() => alert("User has checked in.")} /> : 
                <Typography variant="caption" align="center">Press enter to search.</Typography>
            }
            <Box display="flex" flexDirection="row" mx="auto" mt={2} width="100%" justifyContent="space-between">
                <Button component={Link} href="/namecheckin" variant="contained">USE LAST NAME</Button>
                <Button component={Link} href="/purchase" variant="contained">SWITCH TO PURCHASE</Button>
            </Box>
        </Box>
    )
}