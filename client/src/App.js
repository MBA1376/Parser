import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      svgCode : '' ,
      isLoaded : false
    };
  }


  componentDidMount() {
    fetch('http://localhost:5000/')
        .then(res => res.json())
        .then(json => {
          //console.log(json);
          this.setState({
            isLoaded : true ,
            svgCode : json.strSvg
          });
          console.log(this.state.svgCode)
        }).catch( err => console.log(err));
        
  }
  render() {
    const {svgCode} = this.state;
    return (
      <div className="App">
          <svg height="1500" width="1500" dangerouslySetInnerHTML={{__html: svgCode }} />
      </div>
    );
  }
}

export default App;
