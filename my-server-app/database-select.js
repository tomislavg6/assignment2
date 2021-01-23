const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('students.db');

let sql = `SELECT studentName, studentID, courseName, courseID FROM students
           ORDER BY studentName`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log("studentName=" + row.studentName +" studentID="+row.studentId+ " courseName="+row.courseName + "courseID"+row.courseID);
  });
});

// close the database connection
db.close();