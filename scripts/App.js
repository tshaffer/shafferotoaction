import React, {Component} from 'react';

import Photos from './components/photos';

class App extends Component {
  render() {
    return (
        <div className = "container shafferotoContainer">
            <Photos />
        </div>
    );
  }
}

export default App;