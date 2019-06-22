import React from 'react';
import LoremIpsum from '../LoremIpsum';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { render } from "react-dom";
import { makeData } from "./StatsMaker";
import StatsPlayerDraggableTable from "./StatsPlayerDraggableTable";
import { fetchData } from '../../actions'
import { connect } from 'react-redux';

class StatsPlayersTable extends React.Component {
	state = {
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
	      width: 50,
				filterable: true
	    },
	    {
	      Header: "2-Points-Attempt",
	      accessor: "fg2PtAtt",
	      show: true,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "2-Points-Attempt/Game",
	      accessor: "fg2PtAttPerGame",
	      show: true,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "2-Point-Made",
	      accessor: "fg2PtMade",
	      show: true,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "2-Point-Made/Game",
	      accessor: "fg2PtMadePerGame",
	      show: true,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "2-Point%",
	      accessor: "fg2PtPct",
	      show: true,
	      width: 100,
				filterable: true
	    }
	  ]
	}

	tableScrollTop = 0;
	data = makeData();
	displayCol = e => {
		const cols = this.state.columns.map((col, i) => e===i? {...col, show: !col.show}: col)
		this.setState({
			columns: cols
		});
	}

  render() {
    const { data } = this.props;
    return (
			<div>
				<div>
					<button onClick={() => this.displayCol(0)}>First Name</button>
					<button onClick={() => this.displayCol(1)}>Last Name</button>
					<button onClick={() => this.displayCol(2)}>Age</button>
					<button onClick={() => this.displayCol(3)}>2-Points-Attempt</button>
					<button onClick={() => this.displayCol(4)}>2-Points-Attempt/Game</button>
					<button onClick={() => this.displayCol(5)}>2-Point-Made</button>
					<button onClick={() => this.displayCol(6)}>2-Point-Made/Game</button>
					<button onClick={() => this.displayCol(7)}>2-Point%</button>
				</div>
        <StatsPlayerDraggableTable
          rows={this.data}
          columns={this.state.columns}
          defaultPageSize={20}
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

const mapStateToProps = (state) => {
	return {
		data: state.playersData
	}
}

export default connect(mapStateToProps)(StatsPlayersTable);
