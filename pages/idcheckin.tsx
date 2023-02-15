import CheckinCard from "@/components/CheckinCard";
import { prisma } from "@/lib/api/db";
import { Box, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { Student } from "@prisma/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
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
export default function IdCheckIn({ students }: { students: Array<Student> }) {
    return (
        <>
            <Typography fontWeight="bold" variant="h4">Turnstile</Typography>
            <Typography variant="caption">Check In</Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <TextField label="Last Name" variant="standard" />
                <Button>USE 5 DIGIT ID</Button>
            </Box>
            {/* {students.map((student, i) => <CheckinCard student={student} key={i} />)} */}
        </>
    )
}

// add already checked in v. check in functionality to button