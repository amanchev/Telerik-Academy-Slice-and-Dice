const express = require('express')
const app = express()
let port = process.env.PORT || 3001;

app.use(express.static('./public'));
app.use('/libs', express.static('node_modules'))

app.listen(port, function() {
    console.log('Example app listening on port 3001!')
})