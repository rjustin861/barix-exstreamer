const net = require('net');
const express = require('express');
const Ffmpeg = require('./ffmpeg-lib');

const paServer = process.env.PA_IP_ADDRESS;
const paCommandPort = process.env.COMMAND_PORT;
const paRtpPort = process.env.RTP_PORT;

const ffmpeg = new Ffmpeg(paServer, paRtpPort);

/* Define Connection to Exstreamer - START */
const client = new net.Socket();
// client.connect(paCommandPort, paServer, () => {
//   console.log('Connected to the extsreamer');
// });

// client.once('data', (data) => {
//   console.log(data);
// });

// client.on('error', (error) => {
//   console.log(error);
// });

// client.on('close', () => {
//   console.log('Connection to the extsreamer closed');
//   client.destroy();
// });
/* Define Connection to Exstreamer - END */

const app = express();

require('./routes.js')(app, ffmpeg);

app.listen(3000, () => {
  console.log('Server is up and listening on port 3000');
});
