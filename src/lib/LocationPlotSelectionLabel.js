import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import {toDomXCoord_Linear} from "plot-utils";
import "./LocationPlotSelectionLabel.css"

class LocationPlotSelectionLabel extends PureComponent {
  render() {
    let { selection, /* {name,start,end} */
          minX,maxX,
          width,height} = this.props;
    if (!selection) {
      return null;
    }
    let domStart = toDomXCoord_Linear(width,minX,maxX,selection.start);
    let domEnd = toDomXCoord_Linear(width,minX,maxX,selection.end);
    let label = selection.name;
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
  selection: PropTypes.object,
  minX: PropTypes.number.isRequired,
  maxX: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default LocationPlotSelectionLabel;
