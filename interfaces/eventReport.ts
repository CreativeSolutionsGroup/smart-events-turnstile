export interface ReportRequest{
    event: string,
    year: string,
    term: string,
    checkins: Array<{
        createdAt: string,
        studentId: string,
    }>,
}

export interface ReportResponse{
	Timestamp: string,
	Event: string,
	ID: string | null,
	Year: string,
	Term: string,
	Email: string,
	Proxy: string
}
