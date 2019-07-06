import React, { Component } from 'react';
import createG2 from 'g2-react';

  const Chart = createG2(chart => {
    chart.col('cost', {
      min: 0
    });
    chart.coord('polar');
    chart.axis('cost', {
      labels: null
    });
    chart.axis('stats', {
      gridAlign: 'middle',
      labelOffset: 10,
      labels: {
        label: {
          textAlign: 'center'
        }
      }
    });
    chart.legend('stats', {
      itemWrap: true
    });
    chart.interval().position('stats*cost')
      .color('stats','rgb(252,143,72)-rgb(255,215,135)')
      .label('cost',{offset: -15,label: {textAlign: 'center', fontWeight: 'bold'}})
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });
    chart.render();
  });

  export default class MyComponent extends Component{
    state ={
      data1: [{stats:'d1',cost:96},{stats:'d2',cost:121},{stats:'d3',cost:100},{stats:'d4',cost:111},{stats:'d5',cost:102},{stats:'d6',cost:124},{stats:'d7',cost:123},{stats:'d8',cost:111},{stats:'d9',cost:123},{stats:'d10',cost:109},{stats:'d11',cost:115},{stats:'d12',cost:99},{stats:'d13',cost:91},{stats:'d14',cost:87},{stats:'d15',cost:125},{stats:'d16',cost:130},{stats:'d17',cost:109},{stats:'d18',cost:123},{stats:'d19',cost:91},{stats:'d20',cost:83},{stats:'d21',cost:101},
      {stats:'d22',cost:116},{stats:'d23',cost:111},{stats:'d24',cost:107}],
      data2: [{stats:'d1',cost:88},{stats:'d2',cost:121},{stats:'d3',cost:100},{stats:'d4',cost:111},{stats:'d5',cost:102},{stats:'d6',cost:124},{stats:'d7',cost:123},{stats:'d8',cost:111},{stats:'d9',cost:123},{stats:'d10',cost:109},{stats:'d11',cost:115},{stats:'d12',cost:99},{stats:'d13',cost:91},{stats:'d14',cost:87},{stats:'d15',cost:125},{stats:'d16',cost:130},{stats:'d17',cost:109},{stats:'d18',cost:123},{stats:'d19',cost:91},{stats:'d20',cost:83},{stats:'d21',cost:101},
      {stats:'d22',cost:116},{stats:'d23',cost:111},{stats:'d24',cost:107}],
      data3: [{stats:'d1',cost:96},{stats:'d2',cost:99},{stats:'d3',cost:100},{stats:'d4',cost:111},{stats:'d5',cost:102},{stats:'d6',cost:124},{stats:'d7',cost:123},{stats:'d8',cost:111},{stats:'d9',cost:123},{stats:'d10',cost:109},{stats:'d11',cost:115},{stats:'d12',cost:99},{stats:'d13',cost:91},{stats:'d14',cost:87},{stats:'d15',cost:125},{stats:'d16',cost:130},{stats:'d17',cost:109},{stats:'d18',cost:123},{stats:'d19',cost:91},{stats:'d20',cost:83},{stats:'d21',cost:101},
      {stats:'d22',cost:116},{stats:'d23',cost:111},{stats:'d24',cost:107}],
      data4: [{stats:'d1',cost:96},{stats:'d2',cost:121},{stats:'d3',cost:100},{stats:'d4',cost:111},{stats:'d5',cost:102},{stats:'d6',cost:124},{stats:'d7',cost:123},{stats:'d8',cost:111},{stats:'d9',cost:123},{stats:'d10',cost:109},{stats:'d11',cost:115},{stats:'d12',cost:99},{stats:'d13',cost:91},{stats:'d14',cost:87},{stats:'d15',cost:125},{stats:'d16',cost:130},{stats:'d17',cost:109},{stats:'d18',cost:123},{stats:'d19',cost:91},{stats:'d20',cost:83},{stats:'d21',cost:101},
      {stats:'d22',cost:116},{stats:'d23',cost:111},{stats:'d24',cost:300}],
      data5: [{stats:'d1',cost:96},{stats:'d2',cost:121},{stats:'d3',cost:100},{stats:'d4',cost:111},{stats:'d5',cost:7},{stats:'d6',cost:124},{stats:'d7',cost:123},{stats:'d8',cost:111},{stats:'d9',cost:123},{stats:'d10',cost:109},{stats:'d11',cost:115},{stats:'d12',cost:99},{stats:'d13',cost:91},{stats:'d14',cost:87},{stats:'d15',cost:125},{stats:'d16',cost:130},{stats:'d17',cost:109},{stats:'d18',cost:123},{stats:'d19',cost:91},{stats:'d20',cost:83},{stats:'d21',cost:101},
      {stats:'d22',cost:116},{stats:'d23',cost:111},{stats:'d24',cost:107}],
      data6: [{stats:'d1',cost:96},{stats:'d2',cost:121},{stats:'d3',cost:404},{stats:'d4',cost:111},{stats:'d5',cost:102},{stats:'d6',cost:124},{stats:'d7',cost:123},{stats:'d8',cost:111},{stats:'d9',cost:123},{stats:'d10',cost:109},{stats:'d11',cost:115},{stats:'d12',cost:99},{stats:'d13',cost:91},{stats:'d14',cost:87},{stats:'d15',cost:125},{stats:'d16',cost:130},{stats:'d17',cost:109},{stats:'d18',cost:123},{stats:'d19',cost:91},{stats:'d20',cost:83},{stats:'d21',cost:101},
      {stats:'d22',cost:116},{stats:'d23',cost:111},{stats:'d24',cost:107}],
      forceFit: true,
      width: 500,
      height: 450,
      plotCfg: {
        margin: [35, 140, 35, 0]
      },
    }

    handleChange = (selectedOption) => {
      if (selectedOption.value === "LB") return this.state.data1;
      if (selectedOption.value === "AF") return this.state.data2;
      if (selectedOption.value === "AX") return this.state.data3;
      if (selectedOption.value === "AL") return this.state.data4;
      if (selectedOption.value === "DZ") return this.state.data5;
      if (selectedOption.value === "AS") return this.state.data6;
    }

    render() {
      return (
        <div>
          <Chart
            data={this.handleChange(this.props.selectedOption)}
            width={this.state.width}
            height={this.state.height}
            plotCfg={this.state.plotCfg}
            forceFit={this.state.forceFit} />
        </div>
      );
    }
  }
