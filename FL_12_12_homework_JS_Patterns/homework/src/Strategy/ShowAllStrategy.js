import Strategy from './Strategy';
import React from 'react';

export default class ShowAllStrategy extends React.Component {
  render() {
    return (
      <Strategy 
        data={this.props.data} 
        type={ 'all' }
      />
    );
  }
}