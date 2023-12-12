const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;
const ipinfoToken = '13a85e2ed3e14d'; // Replace with your actual ipinfo.io access token

app.use(bodyParser.json());

app.post('/get_machine_details', async (req, res) => {
    const ipAddress = req.body.ipAddress;

    try {
        // Make a request to ipinfo.io to get machine details
        const response = await axios.get(`https://ipinfo.io/${ipAddress}?token=${ipinfoToken}`);
        const data = response.data;

        // You can customize this based on the response structure of the ipinfo.io API
        const hostName = data.hostname || 'Unknown';

        res.json({ success: true, hostName: hostName });
    } catch (error) {
        console.error('Error:', error.message);
        res.json({ success: false, error: 'Unable to get machine details' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
