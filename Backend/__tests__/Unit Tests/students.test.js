// Import necessary modules and dependencies
const Student = require('../../models/student');
const studentController = require('../../controllers/studentController');

// Mock Order.save to return data in studentController
jest.mock('../../models/student');

// Test cases for createStudent function
describe('studentController', () => {
    describe('createStudent', () => {

        const response = {
            json: jest.fn((x) => x)
        };

        it('should create a new student account', async () => {
            const request = {
                body: {
                    "registerNumber": "IT21341540",
                    "studentName": "Senanayaka W.H.S.M",
                    "studentAge": 23,
                    "email": "heshan@gmail.com",
                    "batchName": "Y3.S2.IT.WE.02.02",
                    "faculty": "Computing",
                    "specialization": "IT",
                    "enrollmentStatus": true,
                    "userType": "student",
                    "userName": "IT21340796",
                    "password": "hs123"
                }                
            };

            const mockSave = jest.fn().mockResolvedValue({});
            Student.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await studentController.createStudent(request, response);

            expect(mockSave).toHaveBeenCalled();
            expect(response.json).toHaveBeenCalledWith("Student Account was created successfully!");
        });

        it('should not create a student if registerNumber is not provided', async () => {
            const request = {
                body: {
                    "registerNumber": "",
                    "studentName": "Senanayaka W.H.S.M",
                    "studentAge": 23,
                    "email": "heshan@gmail.com",
                    "batchName": "Y3.S2.IT.WE.02.02",
                    "faculty": "Computing",
                    "specialization": "IT",
                    "enrollmentStatus": true,
                    "userType": "student",
                    "userName": "IT21340796",
                    "password": "hs123"
                }
                
            };

            const mockSave = jest.fn().mockResolvedValue({});
            Student.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await studentController.createStudent(request, response);

            // Assert that the save function is not called
            expect(mockSave).not.toHaveBeenCalled();
            // Assert that the response does not contain the expected message
            expect(response.json).not.toHaveBeenCalledWith("Student Account was created successfully!");
        });
    });
});
