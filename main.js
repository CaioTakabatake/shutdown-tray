const { app, Tray, Menu, BrowserWindow, ipcMain } = require('electron');
const { resolve } = require('path');
const { spawn } = require('child_process');
const data = require('./data');

let tray;
let win;

function render(tray) {
    let hora = {
        type: 'separator'
    }
    const horario = data.getData();
    if (horario[0]) {
        hora = {
            label: horario[0].hora,
            type: 'submenu',
            submenu: [
                {
                    label: 'Adicionar tempo',
                    type: 'submenu',
                    submenu: [
                        {
                            label: '5 minutos',
                            type: 'normal',
                            click: () => {
                                data.addTimeData(5);
                                setTimeout(() => render(tray), 100);
                            }
                        },
                        {
                            label: '10 minutos',
                            type: 'normal',
                            click: () => {
                                data.addTimeData(10);
                                setTimeout(() => render(tray), 100);
                            }
                        },
                        {
                            label: '20 minutos',
                            type: 'normal',
                            click: () => {
                                data.addTimeData(20);
                                setTimeout(() => render(tray), 100);
                            }
                        },
                        {
                            label: '30 minutos',
                            type: 'normal',
                            click: () => {
                                data.addTimeData(30);
                                setTimeout(() => render(tray), 100);
                            }
                        },
                        {
                            label: '60 minutos',
                            type: 'normal',
                            click: () => {
                                data.addTimeData(60);
                                setTimeout(() => render(tray), 100);
                            }
                        },
                        {
                            label: '120 minutos',
                            type: 'normal',
                            click: () => {
                                data.addTimeData(120);
                                setTimeout(() => render(tray), 100);
                            }
                        }
                    ]
                },
                {
                    label: 'Remover',
                    type: 'normal',
                    click: () => {
                        spawn('shutdown', ['-c']);
                        data.resetData();
                        setTimeout(() => render(tray), 100);
                    }
                }
            ]
        }
    }

    const contextMenu = new Menu.buildFromTemplate([
        {
            label: 'Criar Horário',
            type: 'normal',
            click: () => {
                win = new BrowserWindow({ width: 400, height: 300, frame: false, webPreferences: { nodeIntegration: true, contextIsolation: false } });
                win.loadFile('window/index.html');
            }
        },
        {
            type: 'separator'
        },
        hora,
        {
            type: 'separator'
        },
        {
            label: 'Quit',
            type: 'normal',
            click: () => {
                app.quit();
            }
        }
    ]);

    tray.setContextMenu(contextMenu);
}

app.on('ready', () => {
    tray = new Tray(resolve(__dirname, 'assets', 'logo.png'));
    render(tray);
});

app.on('window-all-closed', () => { })

ipcMain.on('add-hour', (evt, hora) => {
    data.saveData(hora);
    spawn('shutdown', [hora]);
    setTimeout(() => render(tray), 100);
    win.close()
});