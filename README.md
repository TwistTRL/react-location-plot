# react-location-plot

## Demo

https://twisttrl.github.io/react-location-plot

## Import
```
import LocationPlot, {LocationPlotSelectionLabel,LocationPlotHoverSelector} from "react-location-plot";
```

## Example
```
/*
 * data = {id: {name,start,end,id},...}
 */
<LocationPlot   width={width}
                height={height}
                minX={minX}
                maxX={maxX}
                data={data}
                />
```

```
<LocationPlotSelectionLabel   width={width}
                              height={height}
                              minX={0}
                              maxX={2600}
                              data={data}
                              selection={id}
                              />
```

```
<PlotInteractionProvider  width={width} height={height}
                          transitionGraph={INTERACTION_MODEL_BARE}
                          render={(positions)=>
  <LocationPlotHoverSelector data={data}
                              minX={minX}
                              maxX={maxX}
                              width={width}
                              hoveringPosition={positions.hoveringPosition}
                              selectHandler={(obj)=>this.setState({selection:obj})}
                              />
                          }
                          />
```
