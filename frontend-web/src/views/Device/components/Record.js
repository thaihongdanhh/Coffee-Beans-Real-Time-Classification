import React from 'react';
import { Grid, Button} from '@material-ui/core';
export default class Record extends React.Component{
 
   render(){
    return (
     <div style={{margin:5}}>
     <Grid container justify="center" direction="row">
       <Grid item >
       <Button
          onClick={() => console.log("start recording")}
          variant="contained"
          color="primary"
          size="large"
          >Start Recording</Button>
       </Grid>
       <Grid item>
       <Button
          onClick={() => console.log("stop recording")}
          variant="contained"
          color="secondary"
          size="large"
          >Stop Recording</Button>
       </Grid>
       <Grid item>
       <Button
          onClick={() => console.log("Download")}
          variant="contained"
          color='default'
          size="large"
          >Download</Button>
       </Grid>
     </Grid> 
   
   </div>
    );
   }
 }