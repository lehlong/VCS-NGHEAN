const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 8686,
    chunk_size: 10000,
    gop_cache: true,
    ping: 1,
    ping_timeout: 1
  },
  http: {
    port: 6868,
    allow_origin: '*',
  },
  relay: {
    ffmpeg: './ffmpeg/ffmpeg.exe',
    tasks: [
      {
        app: 'live',
        mode: 'static',
        name: 'stream_01',
        edge: 'rtsp://admin:D2s123456@192.168.110.200:554/Streaming/Channels/101',
        rtsp_transport: 'tcp'
      },
    ]
  }
};

var nms = new NodeMediaServer(config);
nms.run();

