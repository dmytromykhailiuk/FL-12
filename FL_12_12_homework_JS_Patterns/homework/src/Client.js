import React from 'react';

import ShowAllStrategy from './Strategy/ShowAllStrategy';
import ShowUnitsStrategy from './Strategy/ShowUnitsStrategy';
import ShowWarningStrategy from './Strategy/ShowWarningStrategy';

import Composite from './Composite/Composite';
import Employer from './Composite/Empoloyer';

export default class Client extends React.Component {
  render() {
    const data = this.props.data;
    const root = new Composite(data[0]);

    const buildTree = (rmItem) => {
      const items = data.filter((el) => {
        return el.rm_id === rmItem.id
      });
      items.forEach((el) => {
        if (el.pool_name) {
          const comp = new Composite(el)
          rmItem.add(comp)
          buildTree(comp);
        } else {
          rmItem.add(new Employer(el));
        }
      })
    };
    console.log(start());
    

    const start = () => {
      return buildTree(root);
    }
    
    if (this.props.tab === 'all') {
      return (  
        <ShowAllStrategy data={start()}/>
      );
    }
    if (this.props.tab === 'units') {
      return (  
        <ShowUnitsStrategy data={start()} />
      );
    }
    if (this.props.tab === 'warnings') {
      return (  
        <ShowWarningStrategy data={start()} value={''} />
      );
    }
  }  
}
