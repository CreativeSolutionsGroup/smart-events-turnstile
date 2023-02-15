import CheckinCard from "@/components/CheckinCard";
import { Box, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { Student } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { checkUser } from "./api/auth/checkAdmin";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return await checkUser(context);
}

export default function NameCheckIn({ students }: { students: Array<Student> }) {
    return (
    <>
        <Typography fontWeight="bold" variant="h4">Turnstile</Typography>
        <Typography variant="caption">Check In</Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            <TextField label="5 Digit Student ID" variant="standard" />
            <Button>USE LAST NAME</Button>
        </Box>
        {/* {students.map((student, i) => <CheckinCard student={student} key={i} />)} */}
    </>
    )
}

// add already checked in v. check in functionality to button