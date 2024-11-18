const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'rahman', // Your MySQL password
    database: 'hospital_management_system' // The name of your database
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL Connected...');
});

// Define the root route to serve your main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to add a new patient
app.post('/add-patient', (req, res) => {
    const patientData = req.body;

    const checkIdSql = 'SELECT * FROM patient_info WHERE number = ?';
    db.query(checkIdSql, [patientData.number], (err, results) => {
        if (err) {
            console.error('Error checking ID number:', err);
            return res.status(500).send('Error checking ID number: ' + err.message);
        }

        if (results.length > 0) {
            return res.status(400).send('ID number already exists.');
        }

        const checkRoomSql = 'SELECT availability FROM room WHERE room_no = ?';
        db.query(checkRoomSql, [patientData.room], (err, results) => {
            if (err) {
                console.error('Error checking room availability:', err);
                return res.status(500).send('Error checking room availability: ' + err.message);
            }

            if (results.length === 0 || results[0].availability === "Occupied") {
                return res.status(400).send('Room is already occupied or does not exist.');
            }

            const sqlInsert = 'INSERT INTO patient_info (idType, number, name, gender, disease, room, time, deposit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [
                patientData.idType,
                patientData.number,
                patientData.name,
                patientData.gender,
                patientData.disease,
                patientData.room,
                patientData.time,
                patientData.deposit
            ];

            db.query(sqlInsert, values, (err, results) => {
                if (err) {
                    console.error('Error inserting patient:', err);
                    return res.status(500).send('Error adding patient: ' + err.message);
                }

                const sqlUpdateRoom = 'UPDATE room SET availability = "Occupied" WHERE room_no = ?';
                db.query(sqlUpdateRoom, [patientData.room], (err) => {
                    if (err) {
                        console.error('Error updating room status:', err);
                        return res.status(500).send('Error updating room status: ' + err.message);
                    }

                    res.status(201).send('Patient successfully added with ID: ' + results.insertId);
                });
            });
        });
    });
});

// API endpoint to fetch all patient data
app.get('/api/patients', (req, res) => {
    const sql = 'SELECT * FROM patient_info';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching patients:', err);
            return res.status(500).send('Error fetching patients: ' + err.message);
        }
        res.json(results);
    });
});

// API endpoint to fetch patient details by ID
app.get('/api/patients/:id', (req, res) => {
    const patientId = req.params.id;
    const sql = 'SELECT * FROM patient_info WHERE id = ?';
    db.query(sql, [patientId], (err, results) => {
        if (err) {
            console.error('Error fetching patient:', err);
            return res.status(500).send('Error fetching patient: ' + err.message);
        }
        res.json(results[0]);
    });
});

// API endpoint to update patient deposit
app.put('/api/patients/:id', (req, res) => {
    const patientId = req.params.id;
    const { amountPaid } = req.body;

    const updatePatientSql = 'UPDATE patient_info SET deposit = ? WHERE id = ?';
    db.query(updatePatientSql, [amountPaid, patientId], (err) => {
        if (err) {
            console.error('Error updating patient details:', err);
            return res.status(500).send('Error updating patient details: ' + err.message);
        }
        res.json({ message: 'Patient details updated successfully' });
    });
});

// API endpoint to fetch available rooms
app.get('/api/rooms', (req, res) => {
    const sql = 'SELECT room_no AS RoomNo, availability AS Availability, price AS Price, room_type AS BedType FROM room WHERE availability = "Available"';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching room data:', err);
            return res.status(500).send('Error fetching room data');
        }
        res.json(results);
    });
});

// API endpoint to search rooms by availability status
app.get('/api/rooms/search', (req, res) => {
    const { status } = req.query;
    const sql = 'SELECT room_no AS RoomNo, availability AS Availability, price AS Price, room_type AS BedType FROM room WHERE availability = ?';
    db.query(sql, [status], (err, results) => {
        if (err) {
            console.error('Error fetching room data:', err);
            return res.status(500).send('Error fetching room data');
        }
        res.json(results);
    });
});

// API endpoint to discharge a patient
app.delete('/api/patients/:id', (req, res) => {
    const patientId = req.params.id;

    const getRoomSql = 'SELECT room FROM patient_info WHERE id = ?';
    db.query(getRoomSql, [patientId], (err, results) => {
        if (err) {
            console.error('Error fetching patient room:', err);
            return res.status(500).send('Error fetching patient room: ' + err.message);
        }

        if (results.length === 0) {
            return res.status(404).send('Patient not found');
        }

        const roomNo = results[0].room;
        const deletePatientSql = 'DELETE FROM patient_info WHERE id = ?';

        db.query(deletePatientSql, [patientId], (err) => {
            if (err) {
                console.error('Error discharging patient:', err);
                return res.status(500).send('Error discharging patient: ' + err.message);
            }

            const updateRoomSql = 'UPDATE room SET availability = "Available" WHERE room_no = ?';
            db.query(updateRoomSql, [roomNo], (err) => {
                if (err) {
                    console.error('Error updating room status after discharge:', err);
                    return res.status(500).send('Error updating room status after discharge: ' + err.message);
                }
                res.json({ message: 'Patient discharged and room status updated' });
            });
        });
    });
});

// Simulated IoT data generation
const generateRandomData = () => {
    return {
        heartRate: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
        temperature: (Math.random() * (37 - 36 + 1) + 36).toFixed(2),
        humidity: (Math.random() * (60 - 30 + 1) + 30).toFixed(2),
        roomOccupancy: Math.random() < 0.5 ? 'Occupied' : 'Available',
    };
};

// API endpoint for simulated IoT data
app.get('/api/iot-data', (req, res) => {
    const simulatedData = generateRandomData();
    res.json(simulatedData);
});
// API endpoint to fetch all department data
app.get('/departments', (req, res) => {
    const sql = 'SELECT department_name, phone_number FROM departments'; // Update this query to match your table structure
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching department data:', err);
            return res.status(500).send('Error fetching department data: ' + err.message);
        }
        res.json(results);
    });
});
app.get('/ambulances', (req, res) => {
    // Query to fetch ambulance data from the database
    const query = 'SELECT name, gender, car_name, availability, location FROM ambulances';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);  // Log the error for debugging
            res.status(500).send('Error fetching ambulance data');
            return;
        }
        console.log('Query results:', results);  // Log the data returned from the database
        res.json(results); // Send the results as JSON
    });
});
app.get('/employees', (req, res) => {
    const query = 'SELECT * FROM employees'; // Change 'employees' to your actual table name
  
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send('Error fetching data');
      } else {
        res.json(results);
      }
    });
  });
  app.post('/api/symptom-checker', (req, res) => {
    console.log('Request Body:', req.body);

    const symptoms = req.body.symptoms; // Array of symptoms

    if (!Array.isArray(symptoms)) {
        return res.status(400).json({ error: 'Expected symptoms to be an array.' });
    }

    if (symptoms.length === 0) {
        return res.status(400).json({ error: 'No symptoms provided.' });
    }

    // Dynamically create placeholders for SQL query
    const placeholders = symptoms.map(() => '?').join(', ');

    const sql = `
        SELECT 
            disease, 
            specialist, 
            medication, 
            COUNT(*) AS match_count
        FROM 
            symptom_checker
        WHERE 
            symptom IN (${placeholders})
        GROUP BY 
            disease, specialist, medication
        ORDER BY 
            match_count DESC
        LIMIT 1;
    `;

    db.query(sql, symptoms, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ error: 'Database error: ' + err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No matching diseases found.' });
        }

        // Send the most relevant result
        const response = {
            disease: results[0].disease,
            specialist: results[0].specialist,
            medication: results[0].medication
        };
        res.json(response);
    });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
