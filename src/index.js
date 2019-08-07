import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {PlotInteractionProvider, INTERACTION_MODEL_BARE} from "react-plot-interaction-box";
import {HashRouter as Router, Link, Route} from "react-router-dom";

import LocationPlot,{LocationPlotSelectionLabel,LocationPlotHoverSelector}  from "./lib";

// CSS
import "./index.css";

// data
import {LOCATION,DATA_MIN_X,DATA_MAX_X} from "./sampleData";

class LocationPlotBundle extends Component {
  constructor(props){
    super(props);
    this.state={width:500,
                height:30,
                minX:DATA_MIN_X,
                maxX:DATA_MAX_X
                };
  }
  
  render() {
    let {width,height,minX,maxX} = this.state;
    return (
      <>
        <fieldset>
          <legend>Props</legend>
          <div>
            width
            <input type="range" min={500} max={1000} value={width}
                                onChange={(ev)=>this.setState({width:Number.parseInt(ev.target.value)})}/>
            {width}
          </div>
          <div>
            height
            <input type="range" min={20} max={50} value={height}
                                onChange={(ev)=>this.setState({height:Number.parseInt(ev.target.value)})}/>
            {height}
          </div>
          <div>
            minX
            <input type="range" min={DATA_MIN_X} max={maxX} value={minX}
                                onChange={(ev)=>this.setState({minX:Number.parseInt(ev.target.value)})}/>
            {minX}
          </div>
          <div>
            maxX
            <input type="range" min={minX} max={DATA_MAX_X} value={maxX}
                                onChange={(ev)=>this.setState({maxX:Number.parseInt(ev.target.value)})}/>
            {maxX}
          </div>
          <div>
            data
            <pre style={{maxHeight:600,overflow:"scroll"}}>
              {JSON.stringify(LOCATION,null,' ')}
            </pre>
          </div>
        </fieldset>
        <fieldset>
          <legend>Result</legend>
          <LocationPlot  width={width}
                          height={height}
                          minX={minX}
                          maxX={maxX}
                          data={LOCATION}
                          />
        </fieldset>
      </>
    );
  }
}

class LocationPlotFullBundle extends Component {
  constructor(props) {
    super(props);
    this.state={selection: null
                }
  }
  
  render() {
    let width = 500;
    let height = 30;
    let minX = DATA_MIN_X;
    let maxX = DATA_MAX_X;
    let {selection} = this.state;
    return (
      <>
        <fieldset>
          <legend>Comment</legend>
          LocationPlot, LocationPlotSelectionLabel, LocationPlotHoverSelector and PlotInteractionProvider working in unison.
          PlotInteractionProvider=>LocationPlotHoverSelector=>"update state"=>LocationPlotSelectionLabel
        </fieldset>
        <fieldset>
          <legend>Result</legend>
          <div style={{width:width,height:height}}>
            <div style={{position:"absolute",width:width,height:height}}>
              <LocationPlot width={width}
                            height={height}
                            minX={minX}
                            maxX={maxX}
                            data={LOCATION}
                            />
            </div>
            <div style={{position:"absolute", width:width,height:height}}>
              <LocationPlotSelectionLabel width={width}
                                          height={height}
                                          minX={minX}
                                          maxX={maxX}
                                          data={LOCATION}
                                          selection={selection}
                                          />
            </div>
            <div style={{position:"absolute", width:width,height:height}}>
              <PlotInteractionProvider  width={width} height={height}
                                        transitionGraph={INTERACTION_MODEL_BARE}
                                        render={(interactions)=>
                <LocationPlotHoverSelector  data={LOCATION}
                                            minX={minX}
                                            maxX={maxX}
                                            width={width}
                                            hoveringPosition={interactions.hoveringPosition}
                                            selectHandler={ (id)=>{this.setState({selection:id})} }
                                            />
                                        }
                                        />
            </div>
          </div>
        </fieldset>
      </>
    );
  }
}

class App extends Component {
  render() {
    return(
      <Router>
        <nav className="app">
          <Link to="/LocationPlot">LocationPlot</Link>
          <Link to="/LocationPlot_full">LocationPlot with all its glory</Link>
        </nav>
        <Route path="/LocationPlot" component={LocationPlotBundle} />
        <Route path="/LocationPlot_full" component={LocationPlotFullBundle} />
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
