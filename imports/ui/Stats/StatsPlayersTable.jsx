import React from 'react';
import LoremIpsum from '../LoremIpsum';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { render } from "react-dom";
import { makeData } from "./StatsMaker";
import StatsPlayerDraggableTable from "./StatsPlayerDraggableTable";

class StatsPlayersTable extends React.Component {
	constructor() {
    super();
    this.state = {
      data: makeData(),
			columns: [
	      {
	        Header: "First Name",
	        accessor: "firstName",
					show: true,
					width: 150
	      },
	      {
	        Header: "Last Name",
	        accessor: "lastName",
					show: true,
					width: 150
	      },
	      {
	        Header: "Age",
	        accessor: "age",
					show: true,
					width: 50
	      },
	      {
	        Header: "2-Points-Attempt",
	        accessor: "fg2PtAtt",
					show: true,
					width: 100
	      },
	      {
	        Header: "2-Points-Attempt/Game",
	        accessor: "fg2PtAttPerGame",
					show: true,
					width: 100
	      },
	      {
	        Header: "2-Point-Made",
	        accessor: "fg2PtMade",
					show: true,
					width: 100
	      },
	      {
	        Header: "2-Point-Made/Game",
	        accessor: "fg2PtMadePerGame",
					show: true,
					width: 100
	      },
	      {
	        Header: "2-Point%",
	        accessor: "fg2PtPct",
					show: true,
					width: 100
	      }
	    ]
    };
    this.tableScrollTop = 0;
		this.displayCol = this.displayCol.bind(this);
  }


	displayCol = e => {
		const cols = this.state.columns.map((col, i) => e===i? {...col, show: !col.show}: col)
		this.setState({
			columns: cols
		});
		console.log(this.state);
	}

  render() {
    const { data } = this.state.data;

    return (
			<div>
				<div>
					<button onClick={() => this.displayCol(0)}>A</button>
					<button onClick={() => this.displayCol(1)}>B</button>
					<button onClick={() => this.displayCol(2)}>C</button>
				</div>
        <StatsPlayerDraggableTable
          rows={this.state.data}
          columns={this.state.columns}
          defaultPageSize={20}
          filterable
          defaultFilterMethod={(filter, row) =>
            row[filter.id] >= filter.value}
          className="-striped -highlight"
          getTableProps={() => {
            return {
              onScroll: e => {
                if (this.tableScrollTop === e.target.scrollTop) {
                  let left = e.target.scrollLeft > 0 ? e.target.scrollLeft : 0;
                  $(".ReactTable .rt-tr .frozen").css({ left: left });
                } else {
                  this.tableScrollTop = e.target.scrollTop;
                }
              }
            };
          }}
        />
        <br />
      </div>
    );
  }
}

export default StatsPlayersTable;
