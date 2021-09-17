const express = require('express');
const process = require('process');
var robot = require("robotjs");
const app = new express();
const port = 3000

app.use(express.static('./'));
app.use(express.json());

var interval = null;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
})

function clickInterval(timeInterval) {
    interval = setInterval(() => robot.mouseClick(), timeInterval);
}

function stopClick() {
    clearInterval(interval)
    console.log("FUNCION stop clicker")
}

app.post('/', (req, res) => {
    let data = {}
    if ( req.body.flag == true ){
        let timeInterval = req.body.time
        clickInterval(timeInterval);
        Object.assign(data, { success: 'inicia clicker' })
        res.send(data)
    }   else {
        console.log(req.body.flag)
        stopClick();
        console.log("stop clicker");
        Object.assign(data, { success: 'apagado' })
        res.send(data)
    }
})

app.get('/exit', (req, res) => {
    console.log('exit clicker')
    process.exitCode = 1
    process.exit(1);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })