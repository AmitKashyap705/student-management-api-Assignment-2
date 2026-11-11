const express = require("express");
const router = express.Router();
const { students, getNextId } = require("../data/students");

// ---------- Helpers ----------
const isValidText = (value) => typeof value === "string" && value.trim() !== "";

const validateStudentBody = (body) => {
  if (!body || !isValidText(body.name) || !isValidText(body.course)) {
    return "Both 'name' and 'course' are required and must be non-empty strings";
  }
  return null;
};

// Validates :id param and attaches the student's index to the request
const findStudent = (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ success: false, message: "Invalid student ID" });
  }
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: `Student with ID ${id} not found` });
  }
  req.studentIndex = index;
  next();
};

// ---------- Routes ----------

// GET /students - get all students
router.get("/", (req, res) => {
  res.status(200).json({ success: true, count: students.length, data: students });
});

// GET /students/:id - get one student
router.get("/:id", findStudent, (req, res) => {
  res.status(200).json({ success: true, data: students[req.studentIndex] });
});

// POST /students - create a student
router.post("/", (req, res) => {
  const error = validateStudentBody(req.body);
  if (error) return res.status(400).json({ success: false, message: error });

  const newStudent = {
    id: getNextId(),
    name: req.body.name.trim(),
    course: req.body.course.trim(),
  };
  students.push(newStudent);
  res.status(201).json({ success: true, message: "Student created", data: newStudent });
});

// PUT /students/:id - update a student
router.put("/:id", findStudent, (req, res) => {
  const error = validateStudentBody(req.body);
  if (error) return res.status(400).json({ success: false, message: error });

  const updated = {
    id: students[req.studentIndex].id,
    name: req.body.name.trim(),
    course: req.body.course.trim(),
  };
  students[req.studentIndex] = updated;
  res.status(200).json({ success: true, message: "Student updated", data: updated });
});

// DELETE /students/:id - delete a student
router.delete("/:id", findStudent, (req, res) => {
  const [deleted] = students.splice(req.studentIndex, 1);
  res.status(200).json({ success: true, message: "Student deleted", data: deleted });
});

module.exports = router;
