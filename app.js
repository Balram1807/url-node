const express = require('express');
const app = express();

app.use('/', (req, res) => {
    "api hitting at backend"
});

app.listen(5000, () => {
    "app listen at port 5000"
})