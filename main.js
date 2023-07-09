const express = require('express');
const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));


const database = [];

app.post('/api', (request, response) => {
        const data = request.body;
        database.push(data);
        console.log(database);
        response.json({
                status: "balls",
                firstNumber: request.body.first,
                secondNumber: request.body.second
        });
});