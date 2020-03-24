import React from "react";
import PoolList from "../Components/PoolList";

export default class Strategy extends React.Component { 
  render() {
    if (this.props.type === 'units') {
      return (
        <PoolList
          withPoolInfo={true}
          onlyRM={true} 
        />
      );
    } else if (this.props.type === 'all' || this.props.type === 'warnings') {
      return (
        <PoolList
          data={this.props.data} 
          withChild={true}
        />
      );
    }
  }
}