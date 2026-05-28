# support-crm-system
# Support CRM System

##  Live Demo
Frontend: https://your-vercel-link
Backend: https://your-railway-link


## Features
- Create Support Tickets
- View All Tickets
- Search Tickets (name, email, ID, description)
- Filter by Status (Open / In Progress / Closed)
- View & Update Ticket Status
- Delete Ticket


##  Tech Stack
Frontend: React + Axios + Tailwind CSS  
Backend: FastAPI (Python)  
Database: SQLite  
Deployment: Vercel + Railway  



##  API Endpoints

POST /api/tickets  
GET /api/tickets  
GET /api/tickets/{ticket_id}  
PUT /api/tickets/{ticket_id}  
DELETE /api/tickets/{ticket_id}  


## What I Learned
- Full-stack integration
- REST API development
- Deployment on Railway & Vercel
- CORS handling
- Database CRUD operations


##  How to Run Locally

### Backend
pip install -r requirements.txt
uvicorn main:app --reload


### Frontend

npm install
npm run dev
