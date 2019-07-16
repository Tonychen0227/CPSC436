import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";

export default class SingleTeamGraph extends React.Component {
  render() {
    const { selectedTeamInfo } = this.props;
    return (
      <div>
        <Chart height={window.innerHeight} data={selectedTeamInfo} forceFit>
          <Coord type="polar" />
          <Tooltip />
          <Geom
            type="interval"
            position="stats*cost"
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label content="stats" offset={-15} />
          </Geom>
        </Chart>
      </div>
    );
  }
}
