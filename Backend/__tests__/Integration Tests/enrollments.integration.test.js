// Import necessary modules and dependencies
const Enrollment = require('../../models/enrollment');
const enrollmentController = require('../../controllers/enrollmentController');

// Mock Order.save to return data in enrollmentController
jest.mock('../../models/enrollment');

// Test cases for createEnrollment function
describe('enrollmentController', () => {
    describe('createEnrollment', () => {

        const response = {
            json: jest.fn((x) => x)
        };

        it('should create an enrollment for a course', async () => {
            const request = {
                body: {
                    "studentId": "IT21345296",
                    "faculty": "Computing",
                    "batchName": "Y3.S2.SE.WE.02.02",
                    "specialization": "SE",
                    "enrollmentStatus": true,
                    "course": "ISDM"
                }
            };

            const mockSave = jest.fn().mockResolvedValue({});
            Enrollment.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await enrollmentController.createEnrollment(request, response);

            expect(mockSave).toHaveBeenCalled();
            expect(response.json).toHaveBeenCalledWith("Enrollment was done successfully!");
        });

        it('should not create an enrollment if course is not provided', async () => {
            const request = {
                body: {
                    "studentId": "IT21345296",
                    "faculty": "Computing",
                    "batchName": "Y3.S2.SE.WE.02.02",
                    "specialization": "SE",
                    "enrollmentStatus": true,
                    "course": ""
                }
                
            };

            const mockSave = jest.fn().mockResolvedValue({});
            Enrollment.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await enrollmentController.createEnrollment(request, response);

            // Assert that the save function is not called
            expect(mockSave).not.toHaveBeenCalled();
            // Assert that the response does not contain the expected message
            expect(response.json).not.toHaveBeenCalledWith("Enrollment was done successfully!");
        });
    });
});
