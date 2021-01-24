var express = require("express")
var cors = require('cors');
var bodyParser = require("body-parser");
var db = require("./database.js")
var app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8080

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});


// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});


// list all students
app.get("/students", (req, res, next) => {
    console.log("SELECT students");
    let sql = `SELECT studentName, studentID, courseName, courseID FROM students ORDER BY studentName`;
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.send(JSON.stringify(rows, null, ""));
    });
});

// Get a single student by name
app.get("/studentsearch/:studentName", (req, res, next) => {
    var sql = "SELECT * FROM students WHERE lower(studentName) = ?"
    var params = [req.params.studentName]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": row
        })
    });
});

// Get a single student by id
app.get("/idsearch/:studentId", (req, res, next) => {
    var sql = "SELECT * FROM students WHERE studentId = ?"
    var params = [req.params.studentId]
    
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        
        res.json({
            "data": row
        })
    });
});

//Create new student
app.post("/addstudent", (req, res, next) => {

    console.log(req.body);
    var errors = []
    var insert = 'INSERT INTO students (studentName, studentId, courseName, courseId) VALUES (?,?,?,?)'
    var params = [
        req.body.studentName,
        req.body.studentId,
        req.body.courseName,
        req.body.courseId
    ]

    db.run(insert, params);

    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    console.log("Created new student: " + req.body.studentName);

});


// update student
// we use COALESCE function to keep the current value if there is no new value (null)

app.put("/updateStudent/:studentName", (req, res, next) => {

    var params = [
        req.body.studentName,
        req.body.studentId,
        req.body.courseName,
        req.body.courseId,
        req.body.studentName
    ]
    var errors = []

    var update = `UPDATE students SET 
    studentName = COALESCE(?,studentName), 
    studentId = COALESCE(?,studentId),
    courseName = COALESCE(?,courseName),
    courseId = COALESCE(?, courseId)
      WHERE studentName = ?`

    console.log("UPDATE student: " + req.body.studentName);

    db.run(update, params);

    if (errors) {
        res.status(400).json({ "error": res.message })
        return;
    }
    res.json({
        message: "success",
        data: data,
        changes: this.changes
    })
});

// delete
app.delete("/deletestudent/:studentName", (req, res, next) => {

    console.log("DELETE student:" + req.params.studentName);

    db.run(
        'DELETE FROM students WHERE studentName = ?',
        req.params.studentName,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", changes: this.changes })
        });
})




// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});