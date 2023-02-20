export interface purchaseRequest{
    event: string,
    year: string,
    term: string,
    checkins: Array<{
        createdAt: string,
        studentId: string,
    }>,
}

export interface purchaseResponse{
    Timestamp: string,
    Event: string,
    ID: string|null,
    Year: string,
    Term: string,
}