import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import {toDomXCoord_Linear} from "plot-utils";

const START_KEY = "START";
const END_KEY = "END";
const NAME_KEY = "NAME";
const ID_KEY = "ID";

const COLOR_LUT={"other":"#5084de",
                 "8s":"#de5f50",
                 "8e":"#deb150",
                 "home":"#7eca8a"
                 };

class LocationPlot extends PureComponent {
  constructor(props){
    super(props);
    this.ref = React.createRef();
  }
  
  render() {
    let { height,
          width } = this.props;
    return (
      <canvas ref={this.ref} width={width} height={1}
              style={{height:height,width:width,backgroundColor:"lightgrey",display:"block"}}>
      </canvas>
    );
  }
  
  componentDidMount(){
    this.draw();
  }
  
  componentDidUpdate() {
    this.draw();
  }
  
  draw() {
    let { data,
          minX,maxX,width} = this.props;
    let canvas = this.ref.current;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,width,1);
    for (let rec of data) {
      // O(n) linear filtering
      if (rec.end<minX || maxX<rec.start){
        continue;
      }
      let startDomX = Math.round(toDomXCoord_Linear(width,minX,maxX,rec[START_KEY]));
      let endDomX = Math.round(toDomXCoord_Linear(width,minX,maxX,rec[END_KEY]));
      let color = COLOR_LUT[rec[NAME_KEY]];
      ctx.fillStyle = color;
      ctx.fillRect(startDomX,0,endDomX-startDomX,1)
    }
  }
}

LocationPlot.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  minX: PropTypes.number.isRequired,
  maxX: PropTypes.number.isRequired,
}

export default LocationPlot;
