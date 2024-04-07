const app = require('./app')

// Server 
const port = 3000;
const hostname = '127.0.0.1';
app.listen(port, hostname, () => {
    console.log(`App running on port ${port}.....`);
});
