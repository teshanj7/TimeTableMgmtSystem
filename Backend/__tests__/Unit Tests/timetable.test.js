// Import necessary modules and dependencies
const TimeTable = require('../../models/timetable');
const timeTableController = require('../../controllers/timetableController');

// Mock Order.save to return data in timeTableController
jest.mock('../../models/timetable');

// Test cases for createTimeTable function
describe('timeTableController', () => {
    describe('createTimeTable', () => {

        const response = {
            json: jest.fn((x) => x)
        };

        it('should create a new timetable', async () => {
            const request = {
                body: {
                    "batch": "Y2.S2.DS.WE.01.01",
                    "faculty": "Computing",
                    "timeTableData": [
                        [
                            {   "date": "2024.03.24",
                                "timeDuration": "09:00 AM - 11:00 AM",
                                "course": "CRE",
                                "location": "B502"
                            },
                            {
                                "date": "2024.03.24",
                                "timeDuration": "11:30 AM - 01:30 PM",
                                "course": "MNX",
                                "location": "A504"
                            }
                        ],
                        [
                            {
                                "date": "2024.03.25",
                                "timeDuration": "02:00 PM - 04:00 PM",
                                "course": "DS",
                                "location": "G1103"
                            },
                                        {
                                "date": "2024.03.25",
                                "timeDuration": "02:00 PM - 04:00 PM",
                                "course": "ISDM",
                                "location": "B503"
                            }
                        ]
                    ]
                }
                
            };

            const mockSave = jest.fn().mockResolvedValue({});
            TimeTable.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await timeTableController.createTimeTable(request, response);

            expect(mockSave).toHaveBeenCalled();
            expect(response.json).toHaveBeenCalledWith("Time Table was created successfully!");
        });

        it('should not create a timetable if batch and faculty is not provided', async () => {
            const request = {
                body: {
                    "batch": "",
                    "faculty": "",
                    "timeTableData": [
                        [
                            {   "date": "2024.03.24",
                                "timeDuration": "09:00 AM - 11:00 AM",
                                "course": "CRE",
                                "location": "B502"
                            },
                            {
                                "date": "2024.03.24",
                                "timeDuration": "11:30 AM - 01:30 PM",
                                "course": "MNX",
                                "location": "A504"
                            }
                        ],
                        [
                            {
                                "date": "2024.03.25",
                                "timeDuration": "02:00 PM - 04:00 PM",
                                "course": "DS",
                                "location": "G1103"
                            },
                                        {
                                "date": "2024.03.25",
                                "timeDuration": "02:00 PM - 04:00 PM",
                                "course": "ISDM",
                                "location": "B503"
                            }
                        ]
                    ]
                }
                
            };

            const mockSave = jest.fn().mockResolvedValue({});
            TimeTable.mockImplementationOnce(() => ({
                save: mockSave,
            }));

            await timeTableController.createTimeTable(request, response);

            // Assert that the save function is not called
            expect(mockSave).not.toHaveBeenCalled();
            // Assert that the response does not contain the expected message
            expect(response.json).not.toHaveBeenCalledWith("Time Table was created successfully!");
        });
    });
});
