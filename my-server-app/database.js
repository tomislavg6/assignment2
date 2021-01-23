var sqlite3 = require('sqlite3').verbose()

// open the database
let db = new sqlite3.Database('students.db', (err) => {
    if (err) {
      console.error(err.message);
      throw err
    }
    console.log('Connected to the student database.');
  });


  // create table 'book'
  const sql='CREATE TABLE students(studentName text, studentId text, courseName text, courseId text)';
  db.run(sql, (err) => {
    if (err) {
        // Table already created 
        console.log('Table already created.');
    }else{
      console.log('Table created.');
      
      // First time Table created, insert some rows
      console.log('First time Table created, creating some rows.');
      
      var insert = 'INSERT INTO students(studentName, studentID, courseName, courseID) VALUES(?,?,?,?)';
      db.run(insert, ['Tomislav Matusinovic', '21407073','ITMB', 'ITMBUS001E']);
    }
  });


// export as module, called db
module.exports = db
