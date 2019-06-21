import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {PlotInteractionProvider, INTERACTION_MODEL_BARE} from "react-plot-interaction-box";
import {HashRouter as Router, Link, Route} from "react-router-dom";

import LocationPlot, {LocationPlotSelectionLabel,LocationPlotHoverSelector}  from "./lib";

// CSS
import "./index.css";

// data
import data from "./sample";

class LocationPlotBundle extends Component {
  constructor(props){
    super(props);
    this.state={width:500,
                height:30,
                minX:0,
                maxX:2000,
                data_:"Other"
                };
  }
  
  render() {
    let {width,height,minX,maxX,data_} = this.state;
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
            <input type="range" min={0} max={maxX} value={minX}
                                onChange={(ev)=>this.setState({minX:Number.parseInt(ev.target.value)})}/>
            {minX}
          </div>
          <div>
            maxX
            <input type="range" min={minX} max={2000} value={maxX}
                                onChange={(ev)=>this.setState({maxX:Number.parseInt(ev.target.value)})}/>
            {maxX}
          </div>
          <div>
            data
            <select value={data_}
                    onChange={(ev)=>this.setState({data_:ev.target.value})}>
              <option value="Other">Other</option>
              <option value="8S">8S</option>
              <option value="8E">8E</option>
              <option value="Home">Home</option>
              <option value="8S_ongoing">8S, ongoing</option>
              <option value="mix">mix</option>
            </select>
            <pre>
              {JSON.stringify(data[data_],null,' ')}
            </pre>
          </div>
        </fieldset>
        <fieldset>
          <legend>Result</legend>
          <LocationPlot  width={width}
                          height={height}
                          minX={minX}
                          maxX={maxX}
                          data={data[data_]}
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
    let minX = 0;
    let maxX = 2500;
    let mixedData = data["mix"];
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
              <LocationPlot  width={width}
                              height={height}
                              minX={0}
                              maxX={2600}
                              data={mixedData}
                              />
            </div>
            <div style={{position:"absolute", width:width,height:height}}>
              <LocationPlotSelectionLabel   width={width}
                                            height={height}
                                            minX={0}
                                            maxX={2600}
                                            data={mixedData}
                                            selection={selection}
                                            />
            </div>
            <div style={{position:"absolute", width:width,height:height}}>
              <PlotInteractionProvider  width={width} height={height}
                                        transitionGraph={INTERACTION_MODEL_BARE}
                                        render={(positions)=>
                <LocationPlotHoverSelector data={mixedData}
                                            minX={minX}
                                            maxX={maxX}
                                            width={width}
                                            hoveringPosition={positions.hoveringPosition}
                                            selectHandler={(obj)=>this.setState({selection:obj})}
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
