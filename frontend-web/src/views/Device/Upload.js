import React from 'react';
import TopBar from './components/TopBar';
import Stream from './components/Stream';
import Container from '@material-ui/core/Container';
import {
  Grid,
  Button,
  InputLabel,
  CircularProgress,
  FormControl,
  Card,
  Typography,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Stack
} from '@mui/material';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from 'axios';

const STATUS_IDLE = 0
const STATUS_UPLOADING = 1

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      Images: [],
      Image: "",
      status: STATUS_IDLE,
      openImage: false,
    }
  }


  uploadFiles = async (data) => {
    this.setState({
      status: STATUS_UPLOADING
    });

    // console.log(URL.createObjectURL(chosenFile[0]))

    await new Promise(async (resolve) => {
      // await data.forEach(async (file, index, array) => {
      //   console.log(file)
      // })
      await axios({
        method: "POST",
        url: "http://ai.ailab.vn:5003/upload",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        // resolve(res)
        console.log(res)
        this.setState({
          Images: res.data,
          files: [],
          status: STATUS_IDLE
        })
      })
    }).then((result) => {
      // console.log(result)
    })


  }

  renderFileList() {
    return <ol>
      {[...this.state.files].map((f, i) => (
        <li key={i}>{f.name}</li>
      ))}
    </ol>
  }

  renderButtonStatus() {
    return (this.state.status === STATUS_IDLE) ?
      'Send to server' :
      <Grid item>
        <CircularProgress aria-label="progress" />
      </Grid>
  }

  packFiles = async (files) => {
    const data = new FormData();

    [...files].forEach((file, i) => {
      data.append(`files`, file)
    })
    return data
  }

  handleUploadClick = async () => {
    console.log(this.state.files.length)
    if (this.state.files.length) {
      const data = await this.packFiles(this.state.files)
      this.uploadFiles(data)
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TopBar
            name="Upload Coffee Beans Classification"
          ></TopBar>
          <Container>
            <Grid container spacing={3}>
              <Card sx={{ width: '100%' }}>
                <FormControl sx={{ m: 5 }}>
                  <Grid item xs={12} lg={12}>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => this.setState({
                        files: e.target.files
                      }
                      )}
                    // id="raised-button-file"
                    />
                    {this.renderFileList()}

                    <Button style={{ marginTop: 20 }} id="raised-button-file" onClick={this.handleUploadClick} disabled={this.state.status === STATUS_UPLOADING} variant="outlined" component="span" >
                      {this.renderButtonStatus()}
                    </Button>
                  </Grid>

                  {this.state.Images.map((data, index) => {                    
                    return <Grid key={index} container spacing={2}> 
                    <Grid item xs={6} lg={6}> 
                    <Typography gutterBottom variant="h5" component="div">
                      Original
                    </Typography>
                    <hr/>
                    <Button variant='text'>
                    <LazyLoadImage
                      key={index}
                      alt={index}
                      effect="blur"
                      src={'http://ai.ailab.vn:5003/image?file_path=' + data.file_raw}
                      style={{ width: '50%' }}
                      onClick={() => {
                        this.setState({
                          openImage: true,
                          Image: data.file_raw
                        });
                      }}
                    />
                  </Button>
                  </Grid>
                    <Grid key={index} item xs={6} lg={6}> 
                    <Typography gutterBottom variant="h5" component="div">
                      Processed
                    </Typography>
                    <hr/>
                    <Button variant='text'>
                      <LazyLoadImage
                        key={index}
                        alt={index}
                        effect="blur"
                        src={'http://ai.ailab.vn:5003/image?file_path=' + data.file_process}
                        style={{ width: '50%' }}
                        onClick={() => {
                          this.setState({
                            openImage: true,
                            Image: data.file_process
                          });
                        }}
                      />
                    </Button>
                    <Typography style={{margin: "auto"}} variant="body2" color="text.secondary">
                  {data.count !== undefined && (Object.keys(data.count).map((data_, index_) => {
                    // if (this.state[data]?.color !== undefined) console.log(JSON.parse(this.state[data]?.color.replaceAll("'", '"')))
                    return <Button
                      // <Grid key={index_} item>                  
                      variant="contained"
                      // color="primary"
                      // color={this.state[data]?.color !== undefined && JSON.parse(this.state[data]?.color.replaceAll("'", '"'))[data_]}
                      style={{backgroundColor: `${data.color !== undefined && data.color[data_]}`}}
                      size="medium"
                    >{data_} - {data.count !== undefined && data.count[data_]}
                    </Button>
                    {/* </Grid> */ }
                  }))
                  }
                </Typography>
                    </Grid>
                  </Grid>
                  })}
                </FormControl>
              </Card>
            </Grid>
            <Dialog fullWidth={true} maxWidth="xl" open={this.state.openImage} onClose={() => {this.setState({openImage: false})}} aria-labelledby="form-dialog-title">
                    {this.state.openImage && (
                        <>
                            <DialogTitle id="form-dialog-title">Image</DialogTitle>
                            <DialogContent>
                                <Stack spacing={3}>
                                    <DialogContentText>
                                        <Typography variant="body2" component="span">
                                            <Button variant='text'>
                                                {this.state.Image}
                                            </Button>
                                        </Typography>
                                    </DialogContentText>
                                    <img style={{width: 1280}} alt={this.state.Image} src={'http://ai.ailab.vn:5003/image?file_path=' + this.state.Image}></img>
                                </Stack>
                            </DialogContent>
                            <DialogActions sx={{ pr: 2.5 }}>
                                <Button sx={{ color: 'dark' }} onClick={() => {this.setState({openImage: false})}} color="secondary">
                                    Cancel
                                </Button>                               
                            </DialogActions>
                        </>
                    )}
                </Dialog>
          </Container>


        </header>
      </div>
    );
  }
}