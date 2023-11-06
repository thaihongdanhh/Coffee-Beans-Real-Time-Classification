import React from 'react';
import TopBar from './components/TopBar';
import Stream from './components/Stream';
import Container from '@material-ui/core/Container';
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TopBar 
            name="Streaming Coffee Beans Real-time Classification"
          ></TopBar>
          <Container>
            <Stream></Stream>
          </Container>
          
     
        </header>
      </div>
    );
  }
}