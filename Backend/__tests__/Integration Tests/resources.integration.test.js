// Import necessary modules and dependencies
const Resource = require('../../models/resource');
const resourceController = require('../../controllers/resouceController');

// Mock Order.save to return data in resourceController
jest.mock('../../models/resource');

// Test cases for createResource function
describe('resourceController', () => {
    describe('createResource', () => {

        const response = {
            json: jest.fn((x) => x)
        };

        it('should create a new resource entity', async () => {
            const request = {
                body: {
                    "resourceName": "Smart Board",
                    "resourceCode": "SB09",
                    "description": "Smart Board used to screen and edit from the board itself",
                    "faculty": "Computing",
                    "availablity": true
                }
            };

            const mockSave = jest.fn().mockResolvedValue({});
            Resource.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await resourceController.createResource(request, response);

            expect(mockSave).toHaveBeenCalled();
            expect(response.json).toHaveBeenCalledWith("Resource Entity was created successfully!");
        });

        it('should not create a resource entity if faculty is not provided', async () => {
            const request = {
                body: {
                    "resourceName": "Smart Board",
                    "resourceCode": "SB09",
                    "description": "Smart Board used to screen and edit from the board itself",
                    "faculty": "",
                    "availablity": true
                }
            };

            const mockSave = jest.fn().mockResolvedValue({});
            Resource.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await resourceController.createResource(request, response);

            // Assert that the save function is not called
            expect(mockSave).not.toHaveBeenCalled();
            // Assert that the response does not contain the expected message
            expect(response.json).not.toHaveBeenCalledWith("Resource Entity was created successfully!");
        });
    });
});
