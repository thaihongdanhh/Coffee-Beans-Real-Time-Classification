import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
export default class TopBar extends React.Component {



 render() {

  return (
   <AppBar position="relative">
    <Toolbar>
    <VisibilityIcon fontSize="large" style={{color: "black"}}></VisibilityIcon>
     <Typography variant="h6" color="inherit" noWrap>
      {this.props.name}
     </Typography>
    </Toolbar>
   </AppBar>
  );
 }

}