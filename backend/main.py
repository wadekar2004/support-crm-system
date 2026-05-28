from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import engine, SessionLocal
import models
from schemas import TicketCreate
from datetime import datetime
from sqlalchemy import or_
from typing import Optional

app = FastAPI()

# CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://support-crm-system.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# CREATE TABLES
models.Base.metadata.create_all(bind=engine)


@app.get("/")
def home():

    return {
        "message": "Support CRM API Running"
    }


# CREATE TICKET
@app.post("/api/tickets")
def create_ticket(ticket: TicketCreate):

    db = SessionLocal()

    try:

        count = db.query(
            models.Ticket
        ).count() + 1

        new_ticket = models.Ticket(

            ticket_id=f"TKT-{count:03}",

            customer_name=ticket.customer_name,

            customer_email=ticket.customer_email,

            subject=ticket.subject,

            description=ticket.description,

            status="Open",

            created_at=datetime.utcnow(),

            updated_at=datetime.utcnow()

        )

        db.add(new_ticket)

        db.commit()

        db.refresh(new_ticket)

        return new_ticket

    finally:

        db.close()


# GET ALL TICKETS
@app.get("/api/tickets")
def get_tickets(

    search: Optional[str] = None,
    status: Optional[str] = None

):

    db = SessionLocal()

    try:

        query = db.query(
            models.Ticket
        )

        # SEARCH
        if search:

            query = query.filter(

                or_(

                    models.Ticket.customer_name.contains(search),

                    models.Ticket.subject.contains(search),

                    models.Ticket.ticket_id.contains(search),

                    models.Ticket.customer_email.contains(search),

                    models.Ticket.description.contains(search)

                )

            )

        # FILTER
        if status:

            query = query.filter(
                models.Ticket.status == status
            )

        tickets = query.all()

        return tickets

    finally:

        db.close()


# GET SINGLE TICKET
@app.get("/api/tickets/{ticket_id}")
def get_ticket(ticket_id: str):

    db = SessionLocal()

    try:

        ticket = db.query(
            models.Ticket
        ).filter(
            models.Ticket.ticket_id == ticket_id
        ).first()

        if not ticket:

            raise HTTPException(
                status_code=404,
                detail="Ticket not found"
            )

        return ticket

    finally:

        db.close()


# UPDATE TICKET
@app.put("/api/tickets/{ticket_id}")
def update_ticket(
    ticket_id: str,
    status: str
):

    db = SessionLocal()

    try:

        ticket = db.query(
            models.Ticket
        ).filter(
            models.Ticket.ticket_id == ticket_id
        ).first()

        if not ticket:

            raise HTTPException(
                status_code=404,
                detail="Ticket not found"
            )

        ticket.status = status

        ticket.updated_at = datetime.utcnow()

        db.commit()

        db.refresh(ticket)

        return {
            "message": "Updated Successfully"
        }

    finally:

        db.close()


# DELETE TICKET
@app.delete("/api/tickets/{ticket_id}")
def delete_ticket(ticket_id: str):

    db = SessionLocal()

    try:

        ticket = db.query(
            models.Ticket
        ).filter(
            models.Ticket.ticket_id == ticket_id
        ).first()

        if not ticket:

            raise HTTPException(
                status_code=404,
                detail="Ticket not found"
            )

        db.delete(ticket)

        db.commit()

        return {
            "message": "Ticket Deleted"
        }

    finally:

        db.close()