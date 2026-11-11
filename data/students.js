// In-memory data store (no database, as per assignment restrictions)
const students = [
  { id: 1, name: "Rahul", course: "BCA" },
  { id: 2, name: "Priya", course: "BTech" },
  { id: 3, name: "Amit", course: "BCA" },
];

// Keeps IDs unique even after deletions
let nextId = students.length + 1;
const getNextId = () => nextId++;

module.exports = { students, getNextId };
