import React from 'react';
import LoremIpsum from '../LoremIpsum';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { render } from "react-dom";
import { makeData } from "./StatsMaker";
import StatsPlayerDraggableTable from "./StatsPlayerDraggableTable";
import { fetchData } from '../../actions'
import { connect } from 'react-redux';
import axios from 'axios';
import "../../../node_modules/bulma/css/bulma.css";

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
	      Header: "2-Attempt",
	      accessor: "fg2PtAtt",
	      show: true,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "2-Att-Avg",
	      accessor: "fg2PtAttPerGame",
	      show: true,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "2-Made",
	      accessor: "fg2PtMade",
	      show: true,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "2-Made-Avg",
	      accessor: "fg2PtMadePerGame",
	      show: true,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "2-%",
	      accessor: "fg2PtPct",
	      show: true,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "3-Attempt",
	      accessor: "fg3PtAtt",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "3-Att-Avg",
	      accessor: "fg3PtAttPerGame",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "3-Made",
	      accessor: "fg3PtMade",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "3-Made-Avg",
	      accessor: "fg3PtMadePerGame",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "3-%",
	      accessor: "fg3PtPct",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "total-Attempt",
	      accessor: "fgAtt",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "total-Att-Avg",
	      accessor: "fgAttPerGame",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "total-Made",
	      accessor: "fgMade",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "total-Made-Avg",
	      accessor: "fgMadePerGame",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "total-%",
	      accessor: "fgPct",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "1-Attempt",
	      accessor: "ftAtt",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "1-Att-Avg",
	      accessor: "ftAttPerGame",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "1-Made",
	      accessor: "ftMade",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "1-Made-Avg",
	      accessor: "ftMadePerGame",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "1-%",
	      accessor: "ftPct",
	      show: true,
	      width: 100,
				filterable: true
	    }
	  ],
		players: []
	}

	componentDidMount() {
    axios.get('https://cpsc436basketballapi.herokuapp.com/data/getPlayers')
      .then(res => {
        this.setState({
          players: res.data
        })
      });
  }

	tableScrollTop = 0;
	displayCol = e => {
		const cols = this.state.columns.map((col, i) => e===i? {...col, show: !col.show}: col)
		this.setState({
			columns: cols
		});
	}

	createPlayerObj = players => {
		console.log(players);
		var playersData = []
		players.map(function (player) {
			playersData.push({
					birthDate: player["player"]["birthDate"],
					firstName: player["player"]["firstName"],
					lastName: player["player"]["lastName"],
					height: player["player"]["height"],
					weight: player["player"]["weight"],
					season: player["player"]["season"],
					blk: player["stats"]["defense"]["blk"],
					blkAgainst: player["stats"]["defense"]["blkAgainst"],
					blkAgainstPerGame: player["stats"]["defense"]["blkAgainstPerGame"],
					stl: player["stats"]["defense"]["stl"],
					stlPerGame: player["stats"]["defense"]["stlPerGame"],
					tov: player["stats"]["defense"]["tov"],
					tovPerGame: player["stats"]["defense"]["tovPerGame"],
					fg2PtAtt: player["stats"]["fieldGoals"]["fg2PtAtt"],
					fg2PtAttPerGame: player["stats"]["fieldGoals"]["fg2PtAttPerGame"],
					fg2PtMade: player["stats"]["fieldGoals"]["fg2PtMade"],
					fg2PtMadePerGame: player["stats"]["fieldGoals"]["fg2PtMadePerGame"],
					fg2PtPct: player["stats"]["fieldGoals"]["fg2PtPct"],
					fg3PtAtt: player["stats"]["fieldGoals"]["fg3PtAtt"],
					fg3PtAttPerGame: player["stats"]["fieldGoals"]["fg3PtAttPerGame"],
					fg3PtMade: player["stats"]["fieldGoals"]["fg3PtMade"],
					fg3PtMadePerGame: player["stats"]["fieldGoals"]["fg3PtMadePerGame"],
					fg3PtPct: player["stats"]["fieldGoals"]["fg3PtPct"],
					fgAtt: player["stats"]["fieldGoals"]["fgAtt"],
					fgAttPerGame: player["stats"]["fieldGoals"]["fgAttPerGame"],
					fgMade: player["stats"]["fieldGoals"]["fgMade"],
					fgMadePerGame: player["stats"]["fieldGoals"]["fgMadePerGame"],
					fgPct: player["stats"]["fieldGoals"]["fgMadePerGame"],
					gamePlayed: player["stats"]["gamePlayed"],
					ftAtt: player["stats"]["freeThrows"]["ftAtt"],
					ftAttPerGame: player["stats"]["freeThrows"]["ftAttPerGame"],
					ftMade: player["stats"]["freeThrows"]["ftMade"],
					ftMadePerGame: player["stats"]["freeThrows"]["ftMadePerGame"],
					ftPct: player["stats"]["freeThrows"]["ftPct"],
					ast: player["stats"]["offense"]["ast"],
					astPerGame: player["stats"]["offense"]["astPerGame"],
					pts: player["stats"]["offense"]["pts"],
					ptsPerGame: player["stats"]["offense"]["ptsPerGame"],
					defReb: player["stats"]["rebounds"]["defReb"],
					defRebPerGame: player["stats"]["rebounds"]["defRebPerGame"],
					offReb: player["stats"]["rebounds"]["offReb"],
					offRebPerGame: player["stats"]["rebounds"]["offRebPerGame"],
					reb: player["stats"]["rebounds"]["reb"],
					rebPerGame: player["stats"]["rebounds"]["rebPerGame"]
				});
			return;
		});
		console.log(playersData);
		return playersData;
	}

  render() {
		console.log(this.data);
		console.log(this.state);
    return (
			<div>
				<div>
					<button className='button is-text' onClick={() => this.displayCol(0)}>First Name</button>
					<button className='button is-text' onClick={() => this.displayCol(1)}>Last Name</button>
					<button className='button is-text' onClick={() => this.displayCol(2)}>2-Attempt</button>
					<button className='button is-text' onClick={() => this.displayCol(3)}>2-Att-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(4)}>2-Made</button>
					<button className='button is-text' onClick={() => this.displayCol(5)}>2-Made-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(6)}>2-%</button>
					<button className='button is-text' onClick={() => this.displayCol(7)}>3-Attempt</button>
					<button className='button is-text' onClick={() => this.displayCol(8)}>3-Att-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(9)}>3-Made</button>
					<button className='button is-text' onClick={() => this.displayCol(10)}>3-Made-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(11)}>3-%</button>
					<button className='button is-text' onClick={() => this.displayCol(12)}>total-Attempt</button>
					<button className='button is-text' onClick={() => this.displayCol(13)}>total-Att-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(14)}>total-Made</button>
					<button className='button is-text' onClick={() => this.displayCol(15)}>total-Made-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(16)}>total-%</button>
					<button className='button is-text' onClick={() => this.displayCol(17)}>1-Attempt</button>
					<button className='button is-text' onClick={() => this.displayCol(18)}>1-Att-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(19)}>1-Made</button>
					<button className='button is-text' onClick={() => this.displayCol(20)}>1-Made-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(21)}>1-%</button>
				</div>
				<br />
        <StatsPlayerDraggableTable
          rows={this.createPlayerObj(this.state.players)}
          columns={this.state.columns}
          defaultPageSize={15}
          defaultFilterMethod={(filter, row) =>
            row[filter.id] >= filter.value}
          className="-striped -highlight"
          getTableProps={() => {
            return {
              onScroll: e => {
                if (this.tableScrollTop === e.target.scrollTop) {
                  let left = e.target.scrollLeft > 0 ? e.target.scrollLeft : 0;
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
