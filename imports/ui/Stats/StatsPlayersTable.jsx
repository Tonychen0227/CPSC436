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
	      width: 150,
				filterable: true,
				filterMethod: (filter, row) => {
					return row[filter.id].toLowerCase().includes(filter.value)
				}
	    },
	    {
	      Header: "Last Name",
	      accessor: "lastName",
	      show: true,
	      width: 150,
				filterable: true,
				filterMethod: (filter, row) => {
					return row[filter.id].toLowerCase().includes(filter.value)
				}
	    },
			{
				Header: "season",
				accessor: "season",
				show: true,
				width: 180,
				filterable: true,
				filterMethod: (filter, row) => {
					if (filter.value === "2018-19Playoff") {
						return row[filter.id] == "2018-19Playoff";
					} else if (filter.value === "2018-19Regular") {
						return row[filter.id] == "2018-19Regular";
					} else if (filter.value === "2017-18Playoff") {
						return row[filter.id] == "2017-18Playoff";
					} else if (filter.value === "2017-18Regular") {
						return row[filter.id] == "2017-18Regular";
					}
				},
				Filter: ({ filter, onChange}) =>
					<select
						onChange={event => onChange(event.target.value)}
						style={{ width: "100%"}}
						value={filter ? filter.value : ""}
					>
						<option value="2018-19Playoff">2018-19Playoff</option>
						<option value="2018-19Regular">2018-19Regular</option>
						<option value="2017-18Playoff">2017-18Playoff</option>
						<option value="2017-18Regular">2017-18Regular</option>
					</select>
			},
			{
	      Header: "total-%",
	      accessor: "fgPct",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "blk",
	      accessor: "blk",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "stl",
	      accessor: "stl",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "gamesPlayed",
	      accessor: "gamesPlayed",
	      show: true,
	      width: 120,
				filterable: true
	    },
			{
	      Header: "ast",
	      accessor: "ast",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "pts",
	      accessor: "pts",
	      show: true,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "reb",
	      accessor: "reb",
	      show: true,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "2-Attempt",
	      accessor: "fg2PtAtt",
	      show: false,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "2-Att-Avg",
	      accessor: "fg2PtAttPerGame",
	      show: false,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "2-Made",
	      accessor: "fg2PtMade",
	      show: false,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "2-Made-Avg",
	      accessor: "fg2PtMadePerGame",
	      show: false,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "2-%",
	      accessor: "fg2PtPct",
	      show: false,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "3-Attempt",
	      accessor: "fg3PtAtt",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "3-Att-Avg",
	      accessor: "fg3PtAttPerGame",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "3-Made",
	      accessor: "fg3PtMade",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "3-Made-Avg",
	      accessor: "fg3PtMadePerGame",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "3-%",
	      accessor: "fg3PtPct",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "total-Attempt",
	      accessor: "fgAtt",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "total-Att-Avg",
	      accessor: "fgAttPerGame",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "total-Made",
	      accessor: "fgMade",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "total-Made-Avg",
	      accessor: "fgMadePerGame",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "1-Attempt",
	      accessor: "ftAtt",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "1-Att-Avg",
	      accessor: "ftAttPerGame",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "1-Made",
	      accessor: "ftMade",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "1-Made-Avg",
	      accessor: "ftMadePerGame",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "1-%",
	      accessor: "ftPct",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "height",
	      accessor: "height",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "weight",
	      accessor: "weight",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "blkAgainst",
	      accessor: "blkAgainst",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "blkAgainst-Avg",
	      accessor: "blkAgainstPerGame",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "stl-Avg",
	      accessor: "stlPerGame",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "tov",
	      accessor: "tov",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "tov-Avg",
	      accessor: "tovPerGame",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "ast-Avg",
	      accessor: "astPerGame",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "pts-Avg",
	      accessor: "ptsPerGame",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "defReb",
	      accessor: "defReb",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "defReb-Avg",
	      accessor: "defRebPerGame",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "offReb",
	      accessor: "offReb",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "offReb-Avg",
	      accessor: "offRebPerGame",
	      show: false,
	      width: 100,
				filterable: true
	    },
			{
	      Header: "reb-Avg",
	      accessor: "rebPerGame",
	      show: false,
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
		var playersData = []
		players.map(function (player) {
			playersData.push({
					birthDate: player["player"]["birthDate"],
					firstName: player["player"]["firstName"],
					lastName: player["player"]["lastName"],
					height: player["player"]["height"],
					weight: player["player"]["weight"],
					season: player["season"],
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
					gamesPlayed: player["stats"]["gamesPlayed"],
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
		return playersData;
	}

  render() {
    return (
			<div>
				<div>
					<button className='button is-text' onClick={() => this.displayCol(0)}>First Name</button>
					<button className='button is-text' onClick={() => this.displayCol(1)}>Last Name</button>
					<button className='button is-text' onClick={() => this.displayCol(2)}>season</button>
					<button className='button is-text' onClick={() => this.displayCol(3)}>total-%</button>
					<button className='button is-text' onClick={() => this.displayCol(4)}>blk</button>
					<button className='button is-text' onClick={() => this.displayCol(5)}>stl</button>
					<button className='button is-text' onClick={() => this.displayCol(6)}>gamePlayed</button>
					<button className='button is-text' onClick={() => this.displayCol(7)}>ast</button>
					<button className='button is-text' onClick={() => this.displayCol(8)}>pts</button>
					<button className='button is-text' onClick={() => this.displayCol(9)}>reb</button>
					<button className='button is-text' onClick={() => this.displayCol(10)}>2-Attempt</button>
					<button className='button is-text' onClick={() => this.displayCol(11)}>2-Att-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(12)}>2-Made</button>
					<button className='button is-text' onClick={() => this.displayCol(13)}>2-Made-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(14)}>2-%</button>
					<button className='button is-text' onClick={() => this.displayCol(15)}>3-Attempt</button>
					<button className='button is-text' onClick={() => this.displayCol(16)}>3-Att-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(17)}>3-Made</button>
					<button className='button is-text' onClick={() => this.displayCol(18)}>3-Made-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(19)}>3-%</button>
					<button className='button is-text' onClick={() => this.displayCol(20)}>total-Attempt</button>
					<button className='button is-text' onClick={() => this.displayCol(21)}>total-Att-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(22)}>total-Made</button>
					<button className='button is-text' onClick={() => this.displayCol(23)}>total-Made-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(24)}>1-Attempt</button>
					<button className='button is-text' onClick={() => this.displayCol(25)}>1-Att-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(26)}>1-Made</button>
					<button className='button is-text' onClick={() => this.displayCol(27)}>1-Made-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(28)}>1-%</button>
					<button className='button is-text' onClick={() => this.displayCol(29)}>height</button>
					<button className='button is-text' onClick={() => this.displayCol(30)}>weight</button>
					<button className='button is-text' onClick={() => this.displayCol(31)}>blkAgainst</button>
					<button className='button is-text' onClick={() => this.displayCol(32)}>blkAgainst-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(33)}>stl-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(34)}>tov</button>
					<button className='button is-text' onClick={() => this.displayCol(35)}>tov-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(36)}>ast-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(37)}>pts-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(38)}>defReb</button>
					<button className='button is-text' onClick={() => this.displayCol(39)}>defReb-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(40)}>offReb</button>
					<button className='button is-text' onClick={() => this.displayCol(41)}>offReb-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(42)}>reb-Avg</button>
				</div>
				<br />
        <StatsPlayerDraggableTable
          rows={this.createPlayerObj(this.state.players)}
          columns={this.state.columns}
          defaultPageSize={10}
          defaultFilterMethod={(filter, row) => {
						if (filter.value.includes(">=")) {
							return row[filter.id] >= filter.value.slice(2);
						} else if (filter.value.includes('>')) {
							return row[filter.id] > filter.value.slice(1);
						} else if (filter.value.includes("<=")) {
							return row[filter.id] <= filter.value.slice(2);
						} else if (filter.value.includes("<")) {
							return row[filter.id] < filter.value.slice(1);
						} else {
							return row[filter.id] == filter.value;
						}
					}}
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
