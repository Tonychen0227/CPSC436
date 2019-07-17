import React from 'react';
import { Chart, Axis, Coord, Geom, Guide, Shape } from 'bizcharts';
const { Html, Arc } = Guide;

Shape.registerShape('point', 'pointer', {
  drawShape(cfg, group) {
    let point = cfg.points[0];
    point = this.parsePoint(point);
    const center = this.parsePoint({
      x: 0,
      y: 0,
    });

    group.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y - 20,
        stroke: cfg.color,
        lineWidth: 5,
        lineCap: 'round',
      },
    });
    return group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 12,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: '#fff',
      },
    });
  },
});

const cols = {
  value: {
    min: 0,
    max: 10,
    tickInterval: 1,
    nice: false,
  },
};

export default class TeamPctGraph extends React.Component {
  render() {
    const { pct, type } = this.props;
    console.log(pct);
    console.log(type);
    const data = [];
    if (type === 'winPct') {
      data.push({ value: pct*10 })
    } else {
      data.push({ value: pct/10 })
    }
    return (
      <Chart height={500} data={data} scale={cols} padding={[0, 150, 300, 0]} >
        <Coord type="polar" startAngle={-10 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.55} />
        <Axis
          name="value"
          zIndex={2}
          line={null}
          label={{
            offset: -16,
            textStyle: {
              fontSize: 12,
              textAlign: 'center',
              textBaseline: 'middle',
            },
          }}
          subTickCount={4}
          subTickLine={{
            length: -8,
            stroke: '#fff',
            strokeOpacity: 1,
          }}
          tickLine={{
            length: -18,
            stroke: '#fff',
            strokeOpacity: 1,
          }}
        />
        <Axis name="1" visible={false} />
        <Guide>
          <Arc
            zIndex={0}
            start={[0, 0.965]}
            end={[10, 0.965]}
            style={{
              stroke: '#CBCBCB',
              lineWidth: 9,
            }}
          />
          <Arc
            zIndex={1}
            start={[0, 0.965]}
            end={[data[0].value, 0.965]}
            style={{
              stroke: '#1890FF',
              lineWidth: 9,
            }}
          />
          <Html
            position={['50%', '90%']}
            html={() => (`<div style="width: 100px;text-align: center;font-size: 8px!important;"><p style="font-size: 1.75em; color: rgba(0,0,0,0.43);margin: 0;">${type}</p><p style="font-size: 1em;color: rgba(0,0,0,0.85);margin: 0;">${data[0].value * 10}%</p></div>`)}
          />
        </Guide>
        <Geom
          type="point"
          position="value*1"
          shape="pointer"
          color="#1890FF"
          active={false}
          style={{ stroke: '#fff', lineWidth: 1 }}
        />
      </Chart>
    );
  }
}
