import React, { Component } from 'react';

class Tab extends Component {

  render() {
    return (
      <div>
        {JSON.stringify(this.props.tabdata)}
      </div>
    );
  }

}

export default Tab;
