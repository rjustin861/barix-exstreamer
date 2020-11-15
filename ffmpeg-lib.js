const fluent = require('fluent-ffmpeg');

class Ffmpeg {
  constructor(pa_server, pa_port) {
    this.paServer = pa_server;
    this.paRtpPort = pa_port;
    this.command = undefined;
    this.inputFile = 'life.mp3';
    this.outputFile = 'output.mp3';
  }

  play() {
    console.log('Play Song');

    this.command = fluent(this.inputFile)
      .native()
      .audioChannels(1)
      .audioCodec('pcm_mulaw')
      .audioFrequency(8000)
      .outputOptions(['-f rtp'])
      .output(`rtp://${this.paServer}:${this.paRtpPort}`)
      .on('start', function (comm) {
        console.log('Spawned Ffmpeg with command: ' + comm);
      })
      .on('error', function (err) {
        console.log('An error occurred: ' + err);
      })
      .on('end', function () {
        console.log('Processing finished !');
      });

    this.command.run();
  }

  speak() {
    //not used
    console.log('Starting Barix');

    this.command = fluent('audio=Microphone (Realtek(R) Audio)')
      .noVideo()
      .inputOptions('-f dshow')
      .audioChannels(1)
      .audioBitrate(128)
      .duration('1:00')
      .on('start', function (comm) {
        console.log('Spawned Ffmpeg with command: ' + comm);
      })
      .on('end', () => {
        console.log('saved');
        this.play(this.outputFile);
      })
      .on('error', function (err) {
        console.log('error : ' + err);
      })
      .save(this.outputFile);
  }

  stop() {
    //not used
    console.log('Stopping Barix');
    this.command.ffmpegProc.stdin.write('q');
  }
}

module.exports = Ffmpeg;
