const jsonfile = require('jsonfile-promised');
const fs = require('fs');
const moment = require('moment');
const { spawn } = require('child_process');

module.exports = {
    saveData(hora) {
        const pathJson = `${__dirname}/horarios.json`;
        const file = [{ hora }]
        jsonfile.writeFile(pathJson, file)
    },
    addTimeData(time) {
        const pathJson = `${__dirname}/horarios.json`;
        let rawdata = fs.readFileSync(pathJson);
        let student = JSON.parse(rawdata);
        let inicio = new Date("2022-02-20T" + student[0].hora);
        let newTime = moment(inicio).add(time, 'm').locale('pt-br').format('LT');
        let hora = newTime;
        jsonfile.writeFile(pathJson, [{ hora }]);
        spawn('shutdown', [hora]);
    },
    getData() {
        const pathJson = `${__dirname}/horarios.json`;
        let rawdata = fs.readFileSync(pathJson);
        let student = JSON.parse(rawdata);
        return student
    },
    resetData() {
        const pathJson = `${__dirname}/horarios.json`;
        jsonfile.writeFile(pathJson, []);
    }
}