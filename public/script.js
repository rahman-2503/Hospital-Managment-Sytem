document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Hardcoded username and password for demo purposes
    if (username === 'admin' && password === 'admin123') {
        alert('Login successful!');
        // Redirect to reception page
        window.location.href = "reception.html";
    } else {
        alert('Invalid username or password');
    }
});
// Function to handle page redirection
function openPage(pageUrl) {
    window.location.href = pageUrl;
}

// Function to handle logout
function logout() {
    alert("Logging out...");
    window.location.href = "login.html"; // Redirect to login page
}

// Simulated patient data
const patientData = [
    { id: 1, number: '123456', name: 'John Doe', gender: 'Male', disease: 'Flu', room: '101', time: '10:00 AM', deposit: '$100' },
    { id: 2, number: '654321', name: 'Jane Smith', gender: 'Female', disease: 'Cold', room: '102', time: '11:00 AM', deposit: '$150' },
    // Add more patient objects as needed
];

// Function to populate the table with patient data
function populateTable(data) {
    const tableBody = document.getElementById('patientTable').getElementsByTagName('tbody')[0];
    
    data.forEach(patient => {
        const row = tableBody.insertRow();
        Object.values(patient).forEach(text => {
            const cell = row.insertCell();
            cell.textContent = text;
        });
    });
}

// Back button functionality
document.getElementById('backButton').addEventListener('click', () => {
    window.history.back(); // Navigate to the previous page
});

// Populate the table on page load
document.addEventListener('DOMContentLoaded', () => {
    populateTable(patientData);
});
document.addEventListener('DOMContentLoaded', () => {
    const roomSelect = document.getElementById('room');
    const timeDisplay = document.getElementById('time');
    const currentDate = new Date();
    timeDisplay.textContent = currentDate.toLocaleString();

    // Simulated room data
    const rooms = ['Room 101', 'Room 102', 'Room 103', 'Room 104'];

    // Populate the room select element
    rooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room;
        option.textContent = room;
        roomSelect.appendChild(option);
    });

    // Handle form submission
    document.getElementById('patientForm').addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission

        const idType = document.getElementById('idType').value;
        const number = document.getElementById('number').value;
        const name = document.getElementById('name').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const disease = document.getElementById('disease').value;
        const room = roomSelect.value;
        const deposit = document.getElementById('deposit').value;

        // Simulate an API call to add the patient
        console.log(`Adding patient: ${idType}, ${number}, ${name}, ${gender}, ${disease}, ${room}, ${timeDisplay.textContent}, ${deposit}`);

        alert('Patient added successfully!');

        // Clear the form
        document.getElementById('patientForm').reset();
        roomSelect.innerHTML = ''; // Clear room options
        rooms.forEach(room => {
            const option = document.createElement('option');
            option.value = room;
            option.textContent = room;
            roomSelect.appendChild(option);
        });
    });

    // Handle back button click
    document.getElementById('backButton').addEventListener('click', () => {
        window.history.back(); // Go back to the previous page
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const roomTableBody = document.querySelector('#roomTable tbody');

    // Simulated room data
    const rooms = [
        { roomNo: '101', availability: 'Occupied', price: '$100', bedType: 'Single' },
        { roomNo: '102', availability: 'Available', price: '$120', bedType: 'Double' },
        { roomNo: '103', availability: 'Occupied', price: '$80', bedType: 'Single' },
        { roomNo: '104', availability: 'Available', price: '$150', bedType: 'Double' },
    ];

    // Populate the table with room data
    rooms.forEach(room => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${room.roomNo}</td>
            <td>${room.availability}</td>
            <td>${room.price}</td>
            <td>${room.bedType}</td>
        `;
        roomTableBody.appendChild(row);
    });

    // Handle back button click
    document.getElementById('backButton').addEventListener('click', () => {
        window.history.back(); // Go back to the previous page
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const departmentTableBody = document.querySelector('#departmentTable tbody');

    // Simulated department data
    const departments = [
        { name: 'Cardiology', phone: '123-456-7890' },
        { name: 'Neurology', phone: '234-567-8901' },
        { name: 'Pediatrics', phone: '345-678-9012' },
        { name: 'Orthopedics', phone: '456-789-0123' },
    ];

    // Populate the table with department data
    departments.forEach(department => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${department.name}</td>
            <td>${department.phone}</td>
        `;
        departmentTableBody.appendChild(row);
    });

    // Handle back button click
    document.getElementById('backButton').addEventListener('click', () => {
        window.history.back(); // Go back to the previous page
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const employeeTableBody = document.querySelector('#employeeTable tbody');

    // Simulated employee data
    const employees = [
        { name: 'John Doe', age: 30, phone: '123-456-7890', salary: '$50000', gmail: 'john@example.com', aadhar: '1234-5678-9012' },
        { name: 'Jane Smith', age: 28, phone: '234-567-8901', salary: '$60000', gmail: 'jane@example.com', aadhar: '2345-6789-0123' },
        { name: 'Michael Johnson', age: 35, phone: '345-678-9012', salary: '$55000', gmail: 'michael@example.com', aadhar: '3456-7890-1234' },
        { name: 'Emily Davis', age: 25, phone: '456-789-0123', salary: '$45000', gmail: 'emily@example.com', aadhar: '4567-8901-2345' },
    ];

    // Populate the table with employee data
    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.age}</td>
            <td>${employee.phone}</td>
            <td>${employee.salary}</td>
            <td>${employee.gmail}</td>
            <td>${employee.aadhar}</td>
        `;
        employeeTableBody.appendChild(row);
    });

    // Handle back button click
    document.getElementById('backButton').addEventListener('click', () => {
        window.history.back(); // Go back to the previous page
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const customerIdSelect = document.getElementById('customerId');
    const roomNumberDisplay = document.getElementById('roomNumber');
    const inTimeDisplay = document.getElementById('inTime');
    const outTimeDisplay = document.getElementById('outTime');

    // Simulated patient data
    const patients = [
        { number: '1', room: '101', inTime: '2024-10-18 10:00:00' },
        { number: '2', room: '102', inTime: '2024-10-19 11:30:00' },
        { number: '3', room: '103', inTime: '2024-10-19 14:15:00' }
    ];

    // Populate customer ID dropdown
    patients.forEach(patient => {
        const option = document.createElement('option');
        option.value = patient.number;
        option.textContent = patient.number;
        customerIdSelect.appendChild(option);
    });

    // Handle Check button click
    document.getElementById('checkButton').addEventListener('click', () => {
        const selectedId = customerIdSelect.value;
        const patient = patients.find(p => p.number === selectedId);

        if (patient) {
            roomNumberDisplay.textContent = patient.room;
            inTimeDisplay.textContent = patient.inTime;
            outTimeDisplay.textContent = new Date().toLocaleString(); // Current date/time for out time
        } else {
            alert('Patient not found');
        }
    });

    // Handle Discharge button click
    document.getElementById('dischargeButton').addEventListener('click', () => {
        const selectedId = customerIdSelect.value;
        const patientIndex = patients.findIndex(p => p.number === selectedId);

        if (patientIndex > -1) {
            // Remove patient from the list and update the room availability (simulated)
            patients.splice(patientIndex, 1);
            roomNumberDisplay.textContent = '';
            inTimeDisplay.textContent = '';
            outTimeDisplay.textContent = '';
            alert('Patient discharged successfully');
        } else {
            alert('Patient not found for discharge');
        }
    });

    // Handle Back button click
    document.getElementById('backButton').addEventListener('click', () => {
        window.history.back(); // Go back to the previous page
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const patientNameSelect = document.getElementById('patientName');
    const roomNumberInput = document.getElementById('roomNumber');
    const inTimeInput = document.getElementById('inTime');
    const amountPaidInput = document.getElementById('amountPaid');
    const pendingAmountInput = document.getElementById('pendingAmount');

    // Simulated patient data
    const patients = [
        { name: 'John Doe', room: '101', inTime: '2024-10-18 10:00:00', amountPaid: 2000 },
        { name: 'Jane Smith', room: '102', inTime: '2024-10-19 11:30:00', amountPaid: 1500 },
        { name: 'Alice Johnson', room: '103', inTime: '2024-10-19 14:15:00', amountPaid: 3000 }
    ];

    // Populate patient names in the dropdown
    patients.forEach(patient => {
        const option = document.createElement('option');
        option.value = patient.name;
        option.textContent = patient.name;
        patientNameSelect.appendChild(option);
    });

    // Handle Check button click
    document.getElementById('checkButton').addEventListener('click', () => {
        const selectedName = patientNameSelect.value;
        const patient = patients.find(p => p.name === selectedName);

        if (patient) {
            roomNumberInput.value = patient.room;
            inTimeInput.value = patient.inTime;
            amountPaidInput.value = patient.amountPaid;

            // Simulating pending amount calculation
            const roomPrice = 4000; // Example room price
            const pendingAmount = roomPrice - patient.amountPaid;
            pendingAmountInput.value = pendingAmount > 0 ? pendingAmount : 0;
        } else {
            alert('Patient not found');
        }
    });

    // Handle Update button click
    document.getElementById('updateButton').addEventListener('click', () => {
        const selectedName = patientNameSelect.value;
        const patientIndex = patients.findIndex(p => p.name === selectedName);

        if (patientIndex > -1) {
            const updatedRoom = roomNumberInput.value;
            const updatedAmount = parseInt(amountPaidInput.value, 10);

            // Update patient details
            patients[patientIndex].room = updatedRoom;
            patients[patientIndex].amountPaid = updatedAmount;

            alert('Updated Successfully');
            // Reset input fields after update
            roomNumberInput.value = '';
            inTimeInput.value = '';
            amountPaidInput.value = '';
            pendingAmountInput.value = '';
        } else {
            alert('Error updating patient details');
        }
    });

    // Handle Back button click
    document.getElementById('backButton').addEventListener('click', () => {
        window.history.back(); // Go back to the previous page
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const ambulanceTableBody = document.querySelector('#ambulanceTable tbody');

    // Simulated ambulance data
    const ambulances = [
        { name: 'Ambulance 1', gender: 'Male', carName: 'Toyota', available: 'Yes', location: 'Location A' },
        { name: 'Ambulance 2', gender: 'Female', carName: 'Honda', available: 'No', location: 'Location B' },
        { name: 'Ambulance 3', gender: 'Male', carName: 'Ford', available: 'Yes', location: 'Location C' }
    ];

    // Populate the table with ambulance data
    ambulances.forEach(ambulance => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ambulance.name}</td>
            <td>${ambulance.gender}</td>
            <td>${ambulance.carName}</td>
            <td>${ambulance.available}</td>
            <td>${ambulance.location}</td>
        `;
        ambulanceTableBody.appendChild(row);
    });

    // Handle Back button click
    document.getElementById('backButton').addEventListener('click', () => {
        window.history.back(); // Go back to the previous page
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const roomTableBody = document.querySelector('#roomTable tbody');

    // Simulated room data
    const rooms = [
        { roomNumber: '101', availability: 'Available', price: '1000', bedType: 'Single' },
        { roomNumber: '102', availability: 'Occupied', price: '1500', bedType: 'Double' },
        { roomNumber: '103', availability: 'Available', price: '1200', bedType: 'Single' }
    ];

    // Populate the table initially
    function populateTable(data) {
        roomTableBody.innerHTML = ''; // Clear existing data
        data.forEach(room => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${room.roomNumber}</td>
                <td>${room.availability}</td>
                <td>${room.price}</td>
                <td>${room.bedType}</td>
            `;
            roomTableBody.appendChild(row);
        });
    }

    // Initial display of all rooms
    populateTable(rooms);

    // Handle Search button click
    document.getElementById('searchButton').addEventListener('click', () => {
        const selectedStatus = document.getElementById('status').value;
        const filteredRooms = rooms.filter(room => room.availability === selectedStatus);
        populateTable(filteredRooms);
    });

    // Handle Back button click
    document.getElementById('backButton').addEventListener('click', () => {
        window.history.back(); // Go back to the previous page
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const symptomCheckboxes = document.querySelectorAll('.symptom');
    const resultLabel = document.getElementById('resultLabel');
    const doctorLabel = document.getElementById('doctorLabel');
    const medicineLabel = document.getElementById('medicineLabel');
    const suggestDoctorButton = document.getElementById('suggestDoctorButton');
    const suggestMedicineButton = document.getElementById('suggestMedicineButton');
    const checkDiseaseButton = document.getElementById('checkDiseaseButton');

    // Data maps
    const symptomDiseaseMap = {
        'Flu': new Set(['Fever', 'Cough', 'Fatigue']),
        'Heart Attack': new Set(['Chest Pain', 'Shortness of Breath', 'Dizziness']),
        'Migraine': new Set(['Headache', 'Nausea', 'Dizziness']),
        'Tonsillitis': new Set(['Sore Throat', 'Fever', 'Cough']),
        'Kidney Infection': new Set(['Back Pain', 'Fatigue', 'Fever']),
        'Dengue': new Set(['Headache', 'Fever', 'Fatigue'])
    };

    const diseaseDoctorMap = {
        'Flu': 'General Physician',
        'Heart Attack': 'Cardiologist',
        'Migraine': 'Neurologist',
        'Tonsillitis': 'ENT Specialist (Otolaryngologist)',
        'Kidney Infection': 'Nephrologist',
        'Dengue': 'Infectious Disease Specialist'
    };

    const diseaseMedicineMap = {
        'Flu': 'Paracetamol, Ibuprofen',
        'Heart Attack': 'Aspirin, Nitroglycerin',
        'Migraine': 'Sumatriptan, Ibuprofen',
        'Tonsillitis': 'Penicillin, Ibuprofen',
        'Kidney Infection': 'Antibiotics (Ciprofloxacin, Amoxicillin)',
        'Dengue': 'Acetaminophen (avoid aspirin or ibuprofen)'
    };

    // Function to check disease based on selected symptoms
    checkDiseaseButton.addEventListener('click', () => {
        const selectedSymptoms = Array.from(symptomCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        let predictedDisease = "Unknown Disease";
        let maxMatches = 0;

        for (const [disease, symptoms] of Object.entries(symptomDiseaseMap)) {
            const matches = Array.from(symptoms).filter(symptom => selectedSymptoms.includes(symptom)).length;
            if (matches > maxMatches) {
                maxMatches = matches;
                predictedDisease = disease;
            }
        }

        resultLabel.textContent = "You may have: " + predictedDisease;

        if (predictedDisease !== "Unknown Disease") {
            suggestDoctorButton.style.display = 'inline';
        } else {
            suggestDoctorButton.style.display = 'none';
            suggestMedicineButton.style.display = 'none';
        }
    });

    // Suggest doctor based on predicted disease
    suggestDoctorButton.addEventListener('click', () => {
        const disease = resultLabel.textContent.replace("You may have: ", "");
        const doctor = diseaseDoctorMap[disease] || "Unknown Doctor";
        doctorLabel.textContent = "Suggested Doctor: " + doctor;

        if (doctor !== "Unknown Doctor") {
            suggestMedicineButton.style.display = 'inline';
        } else {
            suggestMedicineButton.style.display = 'none';
        }
    });

    // Suggest medicine based on predicted disease
    suggestMedicineButton.addEventListener('click', () => {
        const disease = resultLabel.textContent.replace("You may have: ", "");
        const medicine = diseaseMedicineMap[disease] || "Unknown Medicine";
        medicineLabel.textContent = "Suggested Medicine: " + medicine;
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const medicationDropdown = document.getElementById('medicationDropdown');
    const dosageField = document.getElementById('dosageField');
    const frequencyField = document.getElementById('frequencyField');
    const timeField = document.getElementById('timeField');
    const setReminderButton = document.getElementById('setReminderButton');
    const messageDiv = document.getElementById('message');

    setReminderButton.addEventListener('click', () => {
        const medication = medicationDropdown.value;
        const dosage = dosageField.value;
        let frequency;

        try {
            frequency = parseInt(frequencyField.value) * 60000; // Convert minutes to milliseconds
            if (isNaN(frequency) || frequency <= 0) {
                throw new Error("Frequency must be a positive number.");
            }
        } catch (ex) {
            alert("Frequency must be a valid number.");
            return;
        }

        const timeInput = timeField.value;
        const timeParts = timeInput.split(':');
        if (timeParts.length !== 2) {
            alert("Enter time in HH:MM format.");
            return;
        }

        const hour = parseInt(timeParts[0]);
        const minute = parseInt(timeParts[1]);

        if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
            alert("Enter a valid time in HH:MM format.");
            return;
        }

        scheduleReminder(medication, dosage, frequency, hour, minute);
    });

    function scheduleReminder(medication, dosage, frequency, hour, minute) {
        const initialDelay = calculateInitialDelay(hour, minute);

        setTimeout(() => {
            alert(`Time to take your medication: ${medication} (${dosage})`);
        }, initialDelay);

        // Schedule recurring reminders
        setInterval(() => {
            alert(`Time to take your medication: ${medication} (${dosage})`);
        }, frequency);

        messageDiv.textContent = `Reminder set for ${medication} every ${frequency / 60000} minutes.`;
    }

    function calculateInitialDelay(hour, minute) {
        const now = new Date();
        const target = new Date();
        target.setHours(hour);
        target.setMinutes(minute);
        target.setSeconds(0);

        // If the target time is earlier than the current time, add a day
        if (target <= now) {
            target.setDate(target.getDate() + 1);
        }

        return target - now;
    }
});
// iot_receiver.js

document.addEventListener('DOMContentLoaded', () => {
        const dataArea = document.getElementById('dataArea');
    
        // Function to simulate data reception
        function receiveData() {
            const socket = new WebSocket('ws://localhost:5050');
    
            socket.onmessage = (event) => {
                dataArea.value += event.data + "\n"; // Append received data to the textarea
            };
    
            socket.onclose = () => {
                console.log("Connection closed");
            };
        }
    
        // Start receiving data
        receiveData();
    });
    
    // Function to close the receiver (you may implement it as needed)
    function closeReceiver() {
        window.close(); // This will close the tab/window
    }
    
// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Get the back button element
    const backButton = document.getElementById('backButton');
    
    // Check if the back button exists on the page
    if (backButton) {
        // Add a click event listener to the back button
        backButton.addEventListener('click', () => {
            window.history.back(); // Go back to the previous page in history
        });
    }

    // You can add more functionality below as needed
});
