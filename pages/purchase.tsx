import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Student } from "@prisma/client";

export default function Purchase({ student }: { student: Student }) {
    return (
    <>
        <Typography fontWeight="bold" variant="h4">Turnstile</Typography>
        <Typography variant="caption">Purchase</Typography>
        <Box>
            <TextField label="5 Digit Student ID" variant="standard" />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <TextField label="First Name" variant="filled">{student.firstName}</TextField>
                <TextField label="Last Name" variant="filled">{student.lastName}</TextField>
            </Box>
            <TextField label="Year" variant="filled">{student.year}</TextField>
            <TextField label="Email" variant="filled">{student.email}</TextField>
            <TextField label="7 Digit Student ID" variant="filled">{student.id}</TextField>
            <Button>SUBMIT</Button>
        </Box>
    </>
    )
}

// which id is seven digit id? redwood v. id?