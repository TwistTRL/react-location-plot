import { Component } from 'react';
import PropTypes from "prop-types";
import {fromDomXCoord_Linear} from "plot-utils";

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
    let { data, /* { id:{start,end,id},...} */
          minX,maxX,width,
          hoveringPosition,
          selectHandler} = this.props;
    if (hoveringPosition===undefined) {
      return;
    }
    if (hoveringPosition===null) {
      selectHandler(null);
      return;
    }
    let hoverDomX = hoveringPosition.domX;
    let hoverX = fromDomXCoord_Linear(width,minX,maxX,hoverDomX);
    for (let rec of Object.values(data)){
      if (rec.start<hoverX && hoverX<rec.end) {
        selectHandler(rec.id);
      }
    }
  }
}

LocationPlotHoverSelector.propTypes = {
  data: PropTypes.object.isRequired,
  minX: PropTypes.number.isRequired,
  maxX: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  hoveringPosition: PropTypes.object,
  selectHandler: PropTypes.func.isRequired
}

export default LocationPlotHoverSelector;
