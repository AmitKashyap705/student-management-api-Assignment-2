# Student Management REST API

Node.js + Express REST API with CRUD operations on student records.
Data is stored in memory (array/JSON) - no database used.

## Setup
```bash
npm install
npm start        # runs on http://localhost:3000
```

## Project Structure
```
app.js                     # server setup, middleware, error handling
routes/studentRoutes.js    # modular student routes
middleware/logger.js       # custom logger (method, URL, time)
data/students.js           # in-memory student data
```

## Endpoints
| Method | URL             | Description        | Success |
|--------|-----------------|--------------------|---------|
| GET    | /students       | Get all students   | 200     |
| GET    | /students/:id   | Get student by ID  | 200     |
| POST   | /students       | Add a student      | 201     |
| PUT    | /students/:id   | Update a student   | 200     |
| DELETE | /students/:id   | Delete a student   | 200     |

Errors: `400` invalid input/ID or bad JSON, `404` student/route not found, `500` server error.

## Postman Tests
Body for POST / PUT (raw -> JSON):
```json
{ "name": "Neha", "course": "MCA" }
```
