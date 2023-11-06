import React from 'react';
import JSMpeg from "@cycjimmy/jsmpeg-player";
import { Grid, Button } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TopBar from './TopBar';
import { w3cwebsocket as W3CWebSocket } from "websocket";
var sizeOf = require('image-size');

export default class Stream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordStatus: "No Recording",
      recordedBlobs: [],
      recButton: false,
      dowButton: true,
      stopButton: true,
      labStartBtn: true,
      labStopBtn: true,
      frame: ""
    }
    const mediaSource = new MediaSource();
    mediaSource.addEventListener('sourceopen', () => this.handleSourceOpen, false);

  }
  componentDidMount() {
    // let canvas = document.getElementById("video-canvas");
    // let url = "ws://ai.ailab.vn:5005/media/zurich"

    // new JSMpeg.Player(url, { canvas: canvas });

    const cameras = ['cam1', 'cam2', 'cam3', 'cam4', 'cam5','cam6']
    // const cameras = ['cam1', 'cam2']
    cameras.map((data, index) => {
      const client = new W3CWebSocket('ws://ai.ailab.vn:5005/media/' + data);
      client.onopen = () => {
        console.log('WebSocket Client Connected ' + data);
        this.setState({
          isQuetLai: true,
          message_log: ''
        }, () => {
          client.onmessage = async (message) => {
            // console.log(JSON.parse(message.data))
            var img = Buffer.from(JSON.parse(message.data).src, 'base64');
            var dimensions = sizeOf(img);
            // console.log(JSON.parse(message.data).count)            
            if (dimensions.height === 1280) {
              this.setState({
                [data]: {
                  src: 'data:image/png;base64,' + JSON.parse(message.data).src,
                  raw: 'data:image/png;base64,' + JSON.parse(message.data).raw,
                  rotate: '0deg',
                  count: JSON.parse(message.data).count,
                  color: JSON.parse(message.data).color
                }
              })
            }
            else {
              this.setState({
                [data]: {
                  src: 'data:image/png;base64,' + JSON.parse(message.data).src,
                  raw: 'data:image/png;base64,' + JSON.parse(message.data).raw,
                  rotate: '0deg',
                  count: JSON.parse(message.data).count,
                  color: JSON.parse(message.data).color
                }
              })
            }
          }
        })
      }
    })
  }
  handleSourceOpen = event => {
    console.log('MediaSource opened');
    this.sourceBuffer = this.mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
    console.log('Source buffer: ', this.sourceBuffer);
  }

  handleDataAvailable = event => {
    if (event.data && event.data.size > 0) {
      this.setState({
        recordedBlobs: [...this.state.recordedBlobs, event.data]
      })
    }
  }

  record = () => {

    let canvas = document.getElementById("video-canvas");
    const stream = canvas.captureStream();
    this.startRecording(stream);
    console.log(stream);

  }
  handleSourceOpen = event => {
    console.log('MediaSource opened');
    this.sourceBuffer = this.mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
    console.log('Source buffer: ', this.sourceBuffer);
  }
  handleStop = event => {
    console.log('Recorder stopped: ', event);
    //const superBuffer = new Blob(this.state.recordedBlobs, { type: 'video/webm' });
    //this.video.src = window.URL.createObjectURL(superBuffer);
  }
  startRecording = stream => {
    this.setState({ labStartBtn: false });
    let options = { mimeType: 'video/webm' };
    //this.recordedBlobs = [];
    try {
      this.mediaRecorder = new MediaRecorder(stream, options);
    } catch (e0) {
      console.log('Unable to create MediaRecorder with options Object: ', e0);
      try {
        this.options = { mimeType: 'video/webm,codecs=vp9' };
        this.mediaRecorder = new MediaRecorder(stream, options);
      } catch (e1) {
        console.log('Unable to create MediaRecorder with options Object: ', e1);
        try {
          options = 'video/vp8'; // Chrome 47
          this.mediaRecorder = new MediaRecorder(stream, options);
        } catch (e2) {
          alert('MediaRecorder is not supported by this browser.\n\n' +
            'Try Firefox 29 or later, or Chrome 47 or later, ' +
            'with Enable experimental Web Platform features enabled from chrome://flags.');
          console.error('Exception while creating MediaRecorder:', e2);
          return;
        }
      }
    }
    console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);
    this.setState({ recordStatus: 'Recording...' });
    this.setState({ recButton: true })
    this.setState({ stopButton: false })
    this.mediaRecorder.onstop = this.handleStop;
    this.mediaRecorder.ondataavailable = this.handleDataAvailable;
    this.mediaRecorder.start(100); // collect 100ms of data
    console.log('MediaRecorder started', this.mediaRecorder);
  }
  stopRecording = () => {
    this.mediaRecorder.stop();
    console.log('Recorded Blobs: ', this.state.recordedBlobs);
    this.setState({ recordStatus: 'No Recording' });
    this.setState({ recButton: false })
    this.setState({ stopButton: true })
    this.setState({ dowButton: false })
  }
  play = () => {
    this.video.play();
  }
  download = () => {
    const blob = new Blob(this.state.recordedBlobs, { type: 'video/mp4' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    let name = new Date().toLocaleString();
    a.download = name + '.mp4';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }
  render() {


    return (
      <Grid style={{width: 1280}} container justifyContent="center" direction="row">
        {['cam1', 'cam2', 'cam3', 'cam4', 'cam5', 'cam6'].map((data, index) => {
          // console.log(this.state[data]?.count.replaceAll("'",'"'))       
          // this.state[data]?.count && console.log(JSON.parse(this.state[data]?.count.replaceAll("'",'"')))
          return <Card sx={{ maxWidth: 1920, width: 1920 }}>
            <Grid key={index} container justifyContent="center" direction="row">
              <Grid item >
              <CardHeader title="Original"
                subheader={"November 11, 2023 - " + data}
              />
              <div style={{margin: 5, border: '5px solid red' }}>
                <CardMedia
                  sx={{ height: 720, width: 540, maxHeight: 1280, maxWidth: 1280 }}
                  image={this.state[data]?.raw}
                  title={data}
                />
              </div>
                <CardContent sx={{ maxWidth: 540 }}>

                </CardContent>
              </Grid>
              <Grid item >
              <CardHeader title="Processed"
                subheader={"November 11, 2023 - " + data}
              />
              <div style={{margin: 5, border: '5px solid red'}}>
                <CardMedia
                  sx={{ height: 720, width: 540, maxHeight: 1280, maxWidth: 1280 }}
                  image={this.state[data]?.src}
                  title={data}
                />
                </div>
                <CardContent sx={{ maxWidth: 540 }}>
                  {/* <Typography gutterBottom variant="h5" component="div">
                    {data}
                  </Typography> */}
                  <Typography variant="body2" color="text.secondary">
                    {this.state[data]?.count !== undefined && (Object.keys(JSON.parse(this.state[data]?.count.replaceAll("'", '"'))).map((data_, index_) => {
                      // if (this.state[data]?.color !== undefined) console.log(JSON.parse(this.state[data]?.color.replaceAll("'", '"')))
                      return <Button
                        // <Grid key={index_} item>                  
                        variant="contained"
                        // color="primary"
                        // color={this.state[data]?.color !== undefined && JSON.parse(this.state[data]?.color.replaceAll("'", '"'))[data_]}
                        style={{ backgroundColor: `${this.state[data]?.color !== undefined && JSON.parse(this.state[data]?.color.replaceAll("'", '"'))[data_]}` }}
                        size="large"
                        disabled={this.state.recButton}
                      >{data_} - {this.state[data]?.count !== undefined && JSON.parse(this.state[data]?.count.replaceAll("'", '"'))[data_]}
                      </Button>
                    }))
                    }
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        })}        
{/* 
<Grid container justifyContent="center" direction="row">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={this.state.recButton}
              onClick={() => this.play()}
            >Play
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={this.state.recButton}
              onClick={() => this.record()}
            >Record
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              disabled={this.state.stopButton}
              onClick={() => this.stopRecording()}
            >Stop Record
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="default"
              size="large"
              disabled={this.state.dowButton}
              onClick={() => this.download()}
            >Download
            </Button>
          </Grid>

        </Grid> */}

      </Grid>
    )
  }
}