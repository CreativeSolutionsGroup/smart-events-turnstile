import CheckinCard from "@/components/CheckinCard";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { Student } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { checkUser } from "./api/auth/checkAdmin";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return await checkUser(context);
}

export default function NameCheckIn() {
    return (
        <>
            <Typography fontWeight="bold" variant="h4" align="center" mt={6}>Turnstile</Typography>
            <Typography variant="caption" align="center" mt={1}>Check In</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", mx: "auto", maxWidth: "43rem" }}>
                <form>
                    <TextField label="Last Name" variant="standard" sx={{ width: "36rem", mt: 1 }}/>
                    <Button type="submit" variant="contained" sx={{ mt: 2, ml: 0.5 }}>SUBMIT</Button>
                </form>
            </Box>
            {/*<CheckinCard student={student} checkIn={() => alert("User has checked in.")} />*/}
            <Box sx={{ mt: 2, mx: "auto", maxWidth: "43rem"}}>
                <Button variant="contained">USE 5 DIGIT ID</Button>
                <Button variant="contained" sx={{ alignSelf: "flex-end" }}>SWITCH TO PURCHASE</Button>
            </Box>
        </>
    )
}

// add to line 17: onSubmit={handleSubmit}
// add to line 18: name="lastName"
// add to line 23: component={Link} href="/idcheckin"