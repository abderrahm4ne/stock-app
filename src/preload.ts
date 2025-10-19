const { contextBridge, ipcRenderer } = require('electron');

const allowedInvokeChannels = [

];

contextBridge.exposeInMainWorld('electron', {
  sendMessage: (msg: object) => ipcRenderer.send('message', msg)
});
