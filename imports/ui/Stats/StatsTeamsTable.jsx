import React from 'react';
import LoremIpsum from '../LoremIpsum';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { render } from "react-dom";
import { makeData } from "./StatsMaker";
import StatsTeamDraggableTable from "./StatsTeamDraggableTable";
import { fetchData } from '../../actions'
import { connect } from 'react-redux';

class StatsTeamsTable extends React.Component {
	state = {
		columns: [
	    {
	      Header: "Title",
	      accessor: "firstName",
	      show: true,
	      width: 150
	    },
	    {
	      Header: "Data1",
	      accessor: "whatever",
	      show: true,
	      width: 150,
				filterable: true
	    },
	    {
	      Header: "Data2",
	      accessor: "age",
	      show: true,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "Data3",
	      accessor: "fg2PtAtt",
	      show: true,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "Data4",
	      accessor: "fg2PtAttPerGame",
	      show: true,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "Data5",
	      accessor: "fg2PtMade",
	      show: true,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "Data6",
	      accessor: "fg2PtMadePerGame",
	      show: true,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "Data7",
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
					<button className='button is-text' onClick={() => this.displayCol(0)}>Title</button>
					<button className='button is-text' onClick={() => this.displayCol(1)}>Data1</button>
					<button className='button is-text' onClick={() => this.displayCol(2)}>Data2</button>
					<button className='button is-text' onClick={() => this.displayCol(3)}>Data3</button>
					<button className='button is-text' onClick={() => this.displayCol(4)}>Data4</button>
					<button className='button is-text' onClick={() => this.displayCol(5)}>Data5</button>
					<button className='button is-text' onClick={() => this.displayCol(6)}>Data6</button>
					<button className='button is-text' onClick={() => this.displayCol(7)}>Data7</button>
				</div>
				<br />
        <StatsTeamDraggableTable
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

export default connect(mapStateToProps)(StatsTeamsTable);
