const { contextBridge, ipcRenderer } = require('electron');

const allowedInvokeChannels = [

];

contextBridge.exposeInMainWorld('electron', {
  sendMessage: (msg) => ipcRenderer.send('message', msg)
});
