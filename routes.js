module.exports = function (app, ffmpeg) {
  app.post('/play', (req, res) => {
    ffmpeg.play();
    res.send({ data: 'OK' });
  });

  app.post('/speak', (req, res) => {
    ffmpeg.speak();
    res.send({ data: 'OK' });
  });

  app.post('/stop', (req, res) => {
    ffmpeg.stop();
    res.send({ data: 'OK' });
  });
};
