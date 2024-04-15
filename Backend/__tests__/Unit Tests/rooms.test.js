// Import necessary modules and dependencies
const Room = require('../../models/room');
const roomController = require('../../controllers/roomController');

// Mock Order.save to return data in roomController
jest.mock('../../models/room');

// Test cases for createRoom function
describe('roomController', () => {
    describe('createRoom', () => {

        const response = {
            json: jest.fn((x) => x)
        };

        it('should create a new room entity', async () => {
            const request = {
                body: {
                    "roomName": "Engineering Auditorium",
                    "roomNumber": "EA02",
                    "location": "Engineering Building",
                    "noOfSeats": 200,
                    "availablity": true
                }
            };

            const mockSave = jest.fn().mockResolvedValue({});
            Room.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await roomController.createRoom(request, response);

            expect(mockSave).toHaveBeenCalled();
            expect(response.json).toHaveBeenCalledWith("Room Entity was created successfully!");
        });

        it('should not create a room entity if number of seats is negative', async () => {
            const request = {
                body: {
                    "roomName": "Engineering Auditorium",
                    "roomNumber": "EA02",
                    "location": "Engineering Building",
                    "noOfSeats": -200,
                    "availablity": true
                }
            };

            const mockSave = jest.fn().mockResolvedValue({});
            Room.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await roomController.createRoom(request, response);

            // Assert that the save function is not called
            expect(mockSave).not.toHaveBeenCalled();
            // Assert that the response does not contain the expected message
            expect(response.json).not.toHaveBeenCalledWith("Room Entity was created successfully!");
        });
    });
});
