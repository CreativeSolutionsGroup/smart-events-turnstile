import { prisma } from "@/lib/api/db";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Student } from "@prisma/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { SyntheticEvent, useState } from "react"
import { purchaseRequest } from "@/components/purchaseForm";

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

	const [studentInfo, setStudentInfo] = useState<Student>({} as Student);

	const handleSubmit = async ( event: SyntheticEvent ) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            id: { value: string }
        };

		let req = {} as purchaseRequest
		req.checkins = [{createdAt: "", studentId: target.id.value}]
		console.log(req)
		const response = await fetch("/api/student", {
			method: 'POST',
			body: JSON.stringify(req)
		})

        const info = await response.json();
		console.log(info)

		//setStudentInfo(/*set student info here with proper stuff */)
    }

	
	return (
		<>
			<Typography fontWeight="bold" variant="h4">Turnstile</Typography>
			<Typography variant="caption">Purchase</Typography>
			<Box>
				<form onSubmit={handleSubmit}>
					<TextField label="5 Digit Student ID" name="id" variant="standard"  />
					<Button type="submit" variant="contained">SUBMIT</Button>
				</form>
				{
				//we can set these boxes using the info provided from the clouflair worker
				/* <Box sx={{ display: "flex", flexDirection: "row" }}>
				<TextField label="First Name" variant="filled">{student.firstName}</TextField>
				<TextField label="Last Name" variant="filled">{student.lastName}</TextField>
				</Box>
				<TextField label="Year" variant="filled">{student.year}</TextField>
				<TextField label="Email" variant="filled">{student.email}</TextField>
				<TextField label="7 Digit Student ID" variant="filled">{student.redwoodID}</TextField> */}
			</Box>
		</>
	)
}