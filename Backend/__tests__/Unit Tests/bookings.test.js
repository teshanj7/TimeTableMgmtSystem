// Import necessary modules and dependencies
const Booking = require('../../models/booking');
const bookingController = require('../../controllers/bookingController');

// Mock Order.save to return data in bookingController
jest.mock('../../models/booking');

// Test cases for createBooking function
describe('courseController', () => {
    describe('createBooking', () => {

        const response = {
            json: jest.fn((x) => x)
        };

        it('should create a booking for a resource or room', async () => {
            const request = {
                body: {
                    "date": "2024.04.25",
                    "timeDuration": "8:30 - 11:30",
                    "description": "Projector for DSA",
                    "faculty": "Computing",
                    "batchName": "Y2.S2.IT.WE.02.02",
                    "bookingEntity": "PR987"
                }
            };

            const mockSave = jest.fn().mockResolvedValue({});
            Booking.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await bookingController.createBooking(request, response);

            expect(mockSave).toHaveBeenCalled();
            expect(response.json).toHaveBeenCalledWith("Booking was created successfully!");
        });

        it('should not create a booking with a past date', async () => {
            const request = {
                body: {
                    "date": "2024.02.25", // past date
                    "timeDuration": "8:30 - 11:30",
                    "description": "Projector for DSA",
                    "faculty": "Computing",
                    "batchName": "Y2.S2.IT.WE.02.02",
                    "bookingEntity": "PR987"
                }
            };

            const mockSave = jest.fn().mockResolvedValue({});
            Booking.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await bookingController.createBooking(request, response);

            // Assert that the save function is not called
            expect(mockSave).not.toHaveBeenCalled();
            // Assert that the response does not contain the expected message
            expect(response.json).not.toHaveBeenCalledWith("Booking was created successfully!");
        });

        it('should not create a booking if faculty is not provided', async () => {
            const request = {
                body: {
                    "date": "2024.04.25",
                    "timeDuration": "8:30 - 11:30",
                    "description": "Projector for DSA",
                    "faculty": "",
                    "batchName": "Y2.S2.IT.WE.02.02",
                    "bookingEntity": "PR987"
                }
            };

            const mockSave = jest.fn().mockResolvedValue({});
            Booking.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await bookingController.createBooking(request, response);

            // Assert that the save function is not called
            expect(mockSave).not.toHaveBeenCalled();
            // Assert that the response does not contain the expected message
            expect(response.json).not.toHaveBeenCalledWith("Booking was created successfully!");
        });
    });
});
