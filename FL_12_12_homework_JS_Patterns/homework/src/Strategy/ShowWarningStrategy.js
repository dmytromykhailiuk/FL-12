import Strategy from './Strategy';
import React from 'react';

export default class ShowWarningStrategy extends React.Component {
  render() {
    return (
      <Strategy 
        data={ this.props.data.filterPerformance(this.props.value) } 
        type='warnings'
      />
    );
  }
}