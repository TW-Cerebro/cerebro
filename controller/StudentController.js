const Student = require('./model/StudentModel');

const StudentController = {
  // Create a new student in the Database
  // Their information will be sent in the request body
  // This should send the created student
  async createStudent(req, res, next) {
    try {
      // fn to create new student in the db
      const student = await Student.create(req.body);

      // if succesfully created, send a 201 (created) status and the created student object.
      return res.status(201).json(student);
    } catch (err) {
      // if there's an error during creation, pass an error object to the next middleware (global error handler)
      next({ status: 500, message: { err: 'Error while creating the student' } })
    }
  },

  // Get a student from the database and send it in the response
  // Their user name will be in the request parameter 'username'
  // This should send the found student
  // this fn retrieves a student from the database based on the user name provided in the request parameters
  async getStudent(req, res, next) {
    try {
      // Using Mongoose's 'findOne' method to search for a student by their username.
      const student = await Student.findOne({ userName: req.params.username })

      // If no student is found, send the student object as the response.
      if (!student) throw new Error('Student not found.');

      // If a student is found, send the student object as the response.
      return res.json(student);
    } catch(err) {
      // If there's an error during retrieval, pass an error object to the next middleware (global error handler)
      next({ status: 404, message: { err: err.message } })
    }
  },

  // Get a student from the database and update the student
  // The student's user name will be in the request parameter 'username'
  // The student's new user name will be in the request body
  // fn to update a student's details based on the first name provided in the request parameters
  async updateStudent(req, res, next) {
    try {
      // Using Mongoose's 'findOneAndUpdate' method to search for a student by their user name
      // and then update them using the data from the request body.
      // The option '{ new: true }' ensures that the updated student object is returned after the update.
      const student = await Student.findOneAndUpdate({ userName: req.params.username }, req.body, { new: true });

      // If no student is found with the provided name, throw an error.
      if (!student) throw new Error('Student not found.');

      // If the student is successfully updated, send the updated student object as the response.
      return res.json(student);
    } catch (err) {
      // If there's an error during update, pass an error object to the next middleware (global error handler).
      next({ status: 500, message: { err: 'Error while updating the student.' } })
    }

  },

  // Delete a student from the database
  // The student's user name will be sent in the request parameter 'username'
  // This should send a success status code
  // This function deletes a student from the database based on the user name provided in the request parameters.
  async deleteStudent(req, res, next) {
    try {
      // Using Mongoose's 'findOneAndDelete' method to search for a student by their user name and then delete them.
      const result = await Student.findOneAndDelete({ userName: req.params.name });
    
      // If no student is found with the provided user name, throw an error.
      if (!result) throw new Error('Student not found.');
    
      // If the student is successfully deleted, send a 200 (OK) status.
      return res.sendStatus(200);
    } catch (err) {
      // If there's an error during deletion, pass an error object to the next middleware (global error handler).
      next({ status: 500, message: { err: 'Error while deleting the student.' } });
    }
  },
};

// Exporting the StudentController to be used in other modules, such as our routes in main.js
module.exports = StudentController;