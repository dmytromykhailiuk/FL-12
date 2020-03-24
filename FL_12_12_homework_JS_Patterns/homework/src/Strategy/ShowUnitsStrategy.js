import Strategy from './Strategy';
import React from 'react';

export default class ShowUnitsStrategy extends React.Component {
  render() {
    return (
      <Strategy 
        data={this.props.data} 
        type={'units'}
      />
    );
  }
}