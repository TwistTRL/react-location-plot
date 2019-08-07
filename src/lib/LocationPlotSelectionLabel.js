import React, { PureComponent } from 'react';
import {memoize_one} from "memoize";
import PropTypes from "prop-types";
import {toDomXCoord_Linear} from "plot-utils";
// CSS
import "./LocationPlotSelectionLabel.css";

const START_KEY = "START";
const END_KEY = "END";
const NAME_KEY = "NAME";
const ID_KEY = "ID";

class LocationPlotSelectionLabel extends PureComponent {
  render() {
    let { data, /* [ {ID,START,END,...},... ] */
          selection, /* id */
          minX,maxX,
          width,height} = this.props;
    if ( !(selection in data) ) {
      return null;
    }

    let indexedData = this.indexData(data);
    let domStart = toDomXCoord_Linear(width,minX,maxX,indexedData[selection][START_KEY]);
    let domEnd = toDomXCoord_Linear(width,minX,maxX,indexedData[selection][END_KEY]);
    let label = indexedData[selection][NAME_KEY];
    let labelDomX = (Math.max(0,domStart)+Math.min(width,domEnd))/2;
    return (
      <div className="LocationPlotSelectionLabel" style={{width:width,height:height}}>
        <div className="LocationPlotSelectionLabel-float" style={{left:labelDomX}}>
          {label}
        </div>
      </div>
    );
  }

  indexData = memoize_one( (data)=>{
    let ret = {};
    for (let rec of data) {
      ret[rec[ID_KEY]] = rec;
    }
    return ret;
  });
}

LocationPlotSelectionLabel.propTypes = {
  data: PropTypes.array.isRequired,
  selection: PropTypes.number,
  minX: PropTypes.number.isRequired,
  maxX: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default LocationPlotSelectionLabel;
