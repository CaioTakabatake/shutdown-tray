const { ipcRenderer } = require('electron');
const button = document.getElementById('button');
const inputhora = document.getElementById('hora');

button.addEventListener('click', () => {
    const horario = inputhora.value;
    ipcRenderer.send('add-hour', horario);
});