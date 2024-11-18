const generateRandomData = () => {
    return {
        heartRate: Math.floor(Math.random() * (100 - 60 + 1)) + 60, // Random heart rate between 60-100 bpm
        temperature: (Math.random() * (37 - 36 + 1) + 36).toFixed(2), // Random temperature between 36°C - 37°C
        humidity: (Math.random() * (60 - 30 + 1) + 30).toFixed(2), // Random humidity between 30% - 60%
        roomOccupancy: Math.random() < 0.5 ? 'Occupied' : 'Available', // Randomly decide if room is occupied
    };
};

module.exports = generateRandomData;
