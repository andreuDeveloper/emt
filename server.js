
const express = require('express');
const app = express();

const PORT = process.env.PORT || 4200;

// Serve only the static files form the dist directory
app.use(express.static('./dist/emt'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/emt/'}),
);

app.listen(PORT);

console.log(
  `Application started at port: http://localhost:${PORT}`
);
