const express = require('express');
const app = express();
require('dotenv').config();


// Allow CORS so that Firebase URLS are malleable as images
const cors = require('cors');
app.use(cors());

// Create a proxy middleware to filter Firebase requests away from CORS
const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyMiddleware = createProxyMiddleware({
        target: 'https://firebasestorage.googleapis.com',
        changeOrigin: true,
});
// Define the route that will proxy the request
app.use('/proxy-storage', proxyMiddleware);







const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));





// Send the .env file over to index.html so firebase can use api keys
app.get('/env', (req, res) => {
        res.json(process.env);
      });

//console.log(process.env);





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