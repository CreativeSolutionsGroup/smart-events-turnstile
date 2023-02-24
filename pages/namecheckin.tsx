import CheckinCard from "@/components/CheckinCard";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { Student } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { checkUser } from "./api/auth/checkAdmin";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return await checkUser(context);
}

export default function NameCheckIn({ students }: { students: Array<Student> }) {
    return (
        <Paper sx={{ mt: 4, mx: "auto", maxWidth: "45rem", p: 2 }}>
            <Typography fontWeight="bold" variant="h4">Turnstile</Typography>
            <Typography variant="caption">Check In</Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <TextField label="Last Name" variant="standard" />
                <Button>USE LAST NAME</Button>
            </Box>
            {/* {students.map((student, i) => <CheckinCard student={student} key={i} />)} */}
        </Paper>
    )
}