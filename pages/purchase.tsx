import { prisma } from "@/lib/api/db";
import { Box, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
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

export default function Purchase({ student }: InferGetServerSidePropsType<typeof getServerSideProps> & { student: Student }) {
	return (
		<Paper sx={{ mt: 4, mx: "auto", maxWidth: "45rem", p: 2 }}>
			<Typography fontWeight="bold" variant="h4">Turnstile</Typography>
			<Typography variant="caption">Purchase</Typography>
			<Box>
				<TextField label="5 Digit Student ID" variant="standard" />
				{/* <Box sx={{ display: "flex", flexDirection: "row" }}>
                <TextField label="First Name" variant="filled">{student.firstName}</TextField>
                <TextField label="Last Name" variant="filled">{student.lastName}</TextField>
            </Box>
            <TextField label="Year" variant="filled">{student.year}</TextField>
            <TextField label="Email" variant="filled">{student.email}</TextField>
            <TextField label="7 Digit Student ID" variant="filled">{student.redwoodID}</TextField> */}
				<Button variant="contained">SUBMIT</Button>
			</Box>
		</Paper>
	)
}