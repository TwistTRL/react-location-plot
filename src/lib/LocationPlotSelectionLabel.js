import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import {toDomXCoord_Linear} from "plot-utils";
import "./LocationPlotSelectionLabel.css"

class LocationPlotSelectionLabel extends PureComponent {
  render() {
    let { data, /* { id:{name,start,end,id} }*/
          selection, /* id */
          minX,maxX,
          width,height} = this.props;
    if ( !(selection in data) ) {
      return null;
    }
    
    let domStart = toDomXCoord_Linear(width,minX,maxX,data[selection].start);
    let domEnd = toDomXCoord_Linear(width,minX,maxX,data[selection].end);
    let label = data[selection].name;
    let labelDomX = (Math.max(0,domStart)+Math.min(width,domEnd))/2;
    return (
      <div className="LocationPlotSelectionLabel" style={{width:width,height:height}}>
        <div className="LocationPlotSelectionLabel-float" style={{left:labelDomX}}>
          {label}
        </div>
      </div>
    );
  }
}

LocationPlotSelectionLabel.propTypes = {
  data: PropTypes.object.isRequired,
  selection: PropTypes.number,
  minX: PropTypes.number.isRequired,
  maxX: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default LocationPlotSelectionLabel;
