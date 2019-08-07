import { Component } from 'react';
import PropTypes from "prop-types";
import {fromDomXCoord_Linear} from "plot-utils";

const START_KEY = "START";
const END_KEY = "END";
const ID_KEY = "ID";

class LocationPlotHoverSelector extends Component {
  render(){
    return null;
  }

  shouldComponentUpdate(nextProps,nextState){
    if (nextProps.hoveringPosition!==this.props.hoveringPosition) {
      return true;
    }
    return false
  }

  componentDidMount(){
    this.select();
  }
  
  componentDidUpdate(){
    this.select();
  }

  select() {
    let { data, /* [ {ID,START,END,...},... ] */
          minX,maxX,width,
          hoveringPosition,
          selectHandler} = this.props;
    if (hoveringPosition===null) {
      selectHandler(null);
      return;
    }
    let hoveringDomX = hoveringPosition["domX"];
    let hoveringDataX = fromDomXCoord_Linear(width,minX,maxX,hoveringDomX);
    for (let rec of data){
      if (rec[START_KEY]<hoveringDataX && hoveringDataX<rec[END_KEY]) {
        selectHandler(rec[ID_KEY]);
        break;
      }
    }
  }
}

LocationPlotHoverSelector.propTypes = {
  data: PropTypes.array.isRequired,
  minX: PropTypes.number.isRequired,
  maxX: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  hoveringPosition: PropTypes.object,
  selectHandler: PropTypes.func.isRequired
}

export default LocationPlotHoverSelector;
