// Import necessary modules and dependencies
const Course = require('../../models/course');
const courseController = require('../../controllers/courseController');

// Mock Order.save to return data in courseController
jest.mock('../../models/course');

// Test cases for createCourse function
describe('courseController', () => {
    describe('createCourse', () => {

        const response = {
            json: jest.fn((x) => x)
        };

        it('should create a new course', async () => {
            const request = {
                body: {
                    "courseName": "DMS",
                    "courseCode": "IT2030",
                    "description": "Module with Database MS for all Students",
                    "noOfCredits": 3
                }
            };

            const mockSave = jest.fn().mockResolvedValue({});
            Course.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await courseController.createCourse(request, response);

            expect(mockSave).toHaveBeenCalled();
            expect(response.json).toHaveBeenCalledWith("Course was created successfully!");
        });

        it('should not create a course with invalid input', async () => {
            const request = {
                body: {
                    "courseName": "", // no course name added
                    "courseCode": "IT2030",
                    "description": "Module with Database MS for all Students",
                    "noOfCredits": 3
                }
            };

            const mockSave = jest.fn().mockResolvedValue({});
            Course.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await courseController.createCourse(request, response);

            // Assert that the save function is not called
            expect(mockSave).not.toHaveBeenCalled();
            // Assert that the response does not contain the expected message
            expect(response.json).not.toHaveBeenCalledWith("Course was created successfully!");
        });

        it('should not create a Course if course code is not provided', async () => {
            const request = {
                body: {
                    "courseName": "DMS",
                    "courseCode": "",
                    "description": "Module with Database MS for all Students",
                    "noOfCredits": 3
                }
            };

            const mockSave = jest.fn().mockResolvedValue({});
            Course.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await courseController.createCourse(request, response);

            // Assert that the save function is not called
            expect(mockSave).not.toHaveBeenCalled();
            // Assert that the response does not contain the expected message
            expect(response.json).not.toHaveBeenCalledWith("Course was created successfully!");
        });
    });
});
