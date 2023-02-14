import { Box, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { Student } from "@prisma/client";

export default function NameCheckIn({ students }: { students: Array<Student> }) {
    return (
    <>
        <Typography fontWeight="bold" variant="h4">Turnstile</Typography>
        <Typography variant="caption">Check In</Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            <TextField label="5 Digit Student ID" variant="standard" />
            <Button>USE LAST NAME</Button>
        </Box>
        {students.map((student, i) => 
            <Paper key={i} sx={{ mt: 2, mx: "auto", maxWidth: "44rem", p: 2, backgroundColor: grey[200], borderRadius: "18px" }}>
                <Box sx={{ display: "flex", flexDirection: "row" }} minHeight="4rem">
                    <Typography>{student.lastName}, {student.firstName}</Typography>
                    <Button></Button>
                </Box>
            </Paper>
        )}
    </>
    )
}

// add already checked in v. check in functionality to button