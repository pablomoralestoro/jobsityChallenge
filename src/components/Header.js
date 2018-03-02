import React, { Component } from 'react';

class Header extends Component {

  render() {
    return (
      <header className="App-header">
        <p className="Header-item">This form is made as a challenge delivered to Jobsity by Pablo Morales
          and should not be cloned for the same purposes</p>
        <FloatingActionButton className="Header-item" onClick={this.incrementCounter}>
          <ContentAdd />
        </FloatingActionButton>
      </header>
    );
  }

}

export default Header;
