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
      data: makeData()
    };
    this.tableScrollTop = 0;
  }
  render() {
    const { data } = this.state;
    const fieldMap = ["firstName", "lastName", "age"];

    const heads = ["First Name", "Last Name", "Age"];
    const columns = [
			{
				Header: "Name",
				columns: [
		      {
		        Header: "First Name",
		        accessor: "firstName",
						width: 150
		      },
		      {
		        Header: "Last Name",
		        accessor: "lastName",
						width: 150
		      }
				]
			},
			{
				Header: "Info",
				columns: [
		      {
		        Header: "Age",
		        accessor: "age",
						width: 50
		      }
				]
			},
			{
				Header: "Field Goals",
				columns: [
		      {
		        Header: "2-Points-Attempt",
		        accessor: "fg2PtAtt",
						width: 100
		      },
		      {
		        Header: "2-Points-Attempt/Game",
		        accessor: "fg2PtAttPerGame",
						width: 100
		      },
		      {
		        Header: "2-Point-Made",
		        accessor: "fg2PtMade",
						width: 100
		      },
		      {
		        Header: "2-Point-Made/Game",
		        accessor: "fg2PtMadePerGame",
						width: 100
		      },
		      {
		        Header: "2-Point%",
		        accessor: "fg2PtPct",
						width: 100
		      }
				]
			}
    ];
    return (
      <div>
        <StatsPlayerDraggableTable
          rows={data}
          columns={columns}
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
