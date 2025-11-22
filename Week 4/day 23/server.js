// here we will implemnt Login API that returns JWT token upon successful login
// Step 1: basics express Server setup 
// Step 2: Create a dummy user ( Hardcoded Username and password )
// Step 3: Create a login route that accepts username and password
// Step 4: Validate the credentials
// Step 5: If valid, generate JWT token and return it in response
// Step 6: If invalid, return an error message

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 4009;

app.use(express.json());
const SECRET_KEY = 'FUuNCO-XBS1q-Qe0o1KE8Ru-kgTthFgUj8Oje6NH4ud0eIt0U3jwZhOJ0VF0qPntD1LYduSseD3Q7yrmPA08_vbrZfg5S6s6cYABTgtO8asLuoaOxfAHP3Vy6lWGSTJG5KbESBaPWIcQwcEc-R7pxW-LH10oN2-UCYt_ioxWiICttPmT6oy6-7mgA1GdEv-inVOOfgSmj0AvZ_2bdt6KY0PMjSX792xVIv5XMUTReqGD4ih4bqF5jme8Y7-HI2Shmwhitj9wDc_c37tOAHSwmQq-YKn38xeNXHpII1mlpCs8kdtRKnBNQWWCrXxrP4ldUc9dneuhk1GkeyMH07I7CMpstFwYe72UkwlGnFrW1hvUUv9vWYaT8HWI4UVaNumfmZ27FW5If6lpoarviYD7rsglA8na_QRhJiT1mYi_PWRuqxK0x9lNYXYFgrpuQsMSefGN_Y9YTNML7htq6ZVT2l7CCU81ROWvPWRsJBFyEiwZ-1gZ77rvg0vWvatqFxpHguzS2q87HR_9EZTEXWrHkZ6T7g8GzRf2qQKpvrkdx7MbZHqoR9emBlBVxxHt-3TkFdqHJFtr_goRHdMT6-c1fUOCUI2oIo994rQcql1FAcceJOJ_Xgxo3grIkpK_Z-LGt-XQM_WLmBEUQc5I1-E8BWOI5s0W42nBQgNNEr0bMWo';

// Step 2: Create a dummy user
const dummyUser = {
    username: 'admin',
    password: 'password123'
};

// Step 3: Create a login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Step 4: Validate the credentials
    if (username === dummyUser.username && password === dummyUser.password) {
        // Step 5: If valid, generate JWT token
        const token = jwt.sign({ username: dummyUser.username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    } else {
        // Step 6: If invalid, return an error message
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Step 7: Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});