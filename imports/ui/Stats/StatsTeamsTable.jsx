import React from 'react';
import LoremIpsum from '../LoremIpsum';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { render } from "react-dom";
import { makeData } from "./StatsMaker";
import StatsTeamDraggableTable from "./StatsTeamDraggableTable";
import { fetchData } from '../../actions'
import { connect } from 'react-redux';
import axios from 'axios';

class StatsTeamsTable extends React.Component {
	state = {
		columns: [
	    {
	      Header: "Name",
	      accessor: "teamName",
	      show: true,
	      width: 150,
				filterable: true,
				filterMethod: (filter, row) => {
					return row[filter.id].toLowerCase().includes(filter.value)
				}
	    },
	    {
	      Header: "City",
	      accessor: "teamCity",
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
						value={filter ? filter.value : "2018-19Playoff"}
					>
						<option value="2018-19Playoff">2018-19Playoff</option>
						<option value="2018-19Regular">2018-19Regular</option>
						<option value="2017-18Playoff">2017-18Playoff</option>
						<option value="2017-18Regular">2017-18Regular</option>
					</select>
	    },
	    {
	      Header: "wins",
	      accessor: "wins",
	      show: true,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "losses",
	      accessor: "losses",
	      show: true,
	      width: 100,
				filterable: true
	    },
	    {
	      Header: "winPct",
	      accessor: "winPct",
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
	      Header: "total-%",
	      accessor: "fgPct",
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
				Header: "reb",
				accessor: "reb",
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
			},
			{
				Header: "ast",
				accessor: "ast",
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
				Header: "pts",
				accessor: "pts",
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
				Header: "stl",
				accessor: "stl",
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
				Header: "blk",
				accessor: "blk",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "blk-Avg",
				accessor: "blkPerGame",
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
				Header: "ptsAgainst",
				accessor: "ptsAgainst",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "ptsAgainst-Avg",
				accessor: "ptsAgainstPerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "gamesBack",
				accessor: "gamesBack",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "gamesPlayed",
				accessor: "gamesPlayed",
				show: false,
				width: 100,
				filterable: true
			}
	  ],
		teams: []
	}

	componentDidMount() {
    axios.get('https://cpsc436basketballapi.herokuapp.com/data/getTeams')
      .then(res => {
        this.setState({
          teams: res.data
        })
      });
  }

	tableScrollTop = 0;
	data = makeData();
	displayCol = e => {
		const cols = this.state.columns.map((col, i) => e===i? {...col, show: !col.show}: col)
		this.setState({
			columns: cols
		});
	}

	createTeamObj = teams => {
		var teamsData = []
		teams.map(function (team) {
			teamsData.push({
				gamesPlayed: team["stats"]["gamesPlayed"],
				teamCity: team["teamCity"],
				teamName: team["teamName"],
				season: team["season"],
				fg2PtAtt: team["stats"]["fieldGoals"]["fg2PtAtt"],
				fg2PtAttPerGame: team["stats"]["fieldGoals"]["fg2PtAttPerGame"],
				fg2PtMade: team["stats"]["fieldGoals"]["fg2PtMade"],
				fg2PtMadePerGame: team["stats"]["fieldGoals"]["fg2PtMadePerGame"],
				fg2PtPct: team["stats"]["fieldGoals"]["fg2PtPct"],
				fg3PtAtt: team["stats"]["fieldGoals"]["fg3PtAtt"],
				fg3PtAttPerGame: team["stats"]["fieldGoals"]["fg3PtAttPerGame"],
				fg3PtMade: team["stats"]["fieldGoals"]["fg3PtMade"],
				fg3PtMadePerGame: team["stats"]["fieldGoals"]["fg3PtMadePerGame"],
				fg3PtPct: team["stats"]["fieldGoals"]["fg3PtPct"],
				fgAtt: team["stats"]["fieldGoals"]["fgAtt"],
				fgAttPerGame: team["stats"]["fieldGoals"]["fgAttPerGame"],
				fgMade: team["stats"]["fieldGoals"]["fgMade"],
				fgMadePerGame: team["stats"]["fieldGoals"]["fgMadePerGame"],
				fgPct: team["stats"]["fieldGoals"]["fgPct"],
				ftAtt: team["stats"]["freeThrows"]["ftAtt"],
				ftAttPerGame: team["stats"]["freeThrows"]["ftAttPerGame"],
				ftMade: team["stats"]["freeThrows"]["ftMade"],
				ftMadePerGame: team["stats"]["freeThrows"]["ftMadePerGame"],
				ftPct: team["stats"]["freeThrows"]["ftPct"],
				offReb: team["stats"]["rebounds"]["offReb"],
				offRebPerGame: team["stats"]["rebounds"]["offRebPerGame"],
				defReb: team["stats"]["rebounds"]["defReb"],
				defRebPerGame: team["stats"]["rebounds"]["defRebPerGame"],
				reb: team["stats"]["rebounds"]["reb"],
				rebPerGame: team["stats"]["rebounds"]["rebPerGame"],
				ast: team["stats"]["offense"]["ast"],
				astPerGame: team["stats"]["offense"]["astPerGame"],
				pts: team["stats"]["offense"]["pts"],
				ptsPerGame: team["stats"]["offense"]["ptsPerGame"],
				tov: team["stats"]["defense"]["tov"],
				tovPerGame: team["stats"]["defense"]["tovPerGame"],
				stl: team["stats"]["defense"]["stl"],
				stlPerGame: team["stats"]["defense"]["stlPerGame"],
				blk: team["stats"]["defense"]["blk"],
				blkPerGame: team["stats"]["defense"]["blkPerGame"],
				blkAgainst: team["stats"]["defense"]["blkAgainst"],
				blkAgainstPerGame: team["stats"]["defense"]["blkAgainstPerGame"],
				ptsAgainst: team["stats"]["defense"]["ptsAgainst"],
				ptsAgainstPerGame: team["stats"]["defense"]["ptsAgainstPerGame"],
				wins: team["stats"]["standings"]["wins"],
				losses: team["stats"]["standings"]["losses"],
				winPct: team["stats"]["standings"]["winPct"],
				gamesBack: team["stats"]["standings"]["gamesBack"],
			});
			return;
		});
		console.log(teamsData);
		return teamsData;
	}

  render() {
    const { data } = this.props;
    return (
			<div>
				<div>
					<button className='button is-text' onClick={() => this.displayCol(0)}>Name</button>
					<button className='button is-text' onClick={() => this.displayCol(1)}>City</button>
					<button className='button is-text' onClick={() => this.displayCol(2)}>season</button>
					<button className='button is-text' onClick={() => this.displayCol(3)}>wins</button>
					<button className='button is-text' onClick={() => this.displayCol(4)}>losses</button>
					<button className='button is-text' onClick={() => this.displayCol(5)}>winPct</button>
					<button className='button is-text' onClick={() => this.displayCol(6)}>2-Attempt</button>
					<button className='button is-text' onClick={() => this.displayCol(7)}>2-Att-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(8)}>2-Made</button>
					<button className='button is-text' onClick={() => this.displayCol(9)}>2-Made-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(10)}>2-%</button>
					<button className='button is-text' onClick={() => this.displayCol(11)}>3-Attempt</button>
					<button className='button is-text' onClick={() => this.displayCol(12)}>3-Att-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(13)}>3-Made</button>
					<button className='button is-text' onClick={() => this.displayCol(14)}>3-Made-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(15)}>3-%</button>
					<button className='button is-text' onClick={() => this.displayCol(16)}>total-Attempt</button>
					<button className='button is-text' onClick={() => this.displayCol(17)}>total-Att-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(18)}>total-Made</button>
					<button className='button is-text' onClick={() => this.displayCol(19)}>total-Made-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(20)}>total-%</button>
					<button className='button is-text' onClick={() => this.displayCol(21)}>1-Attempt</button>
					<button className='button is-text' onClick={() => this.displayCol(22)}>1-Att-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(23)}>1-Made</button>
					<button className='button is-text' onClick={() => this.displayCol(24)}>1-Made-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(25)}>1-%</button>
					<button className='button is-text' onClick={() => this.displayCol(26)}>offReb</button>
					<button className='button is-text' onClick={() => this.displayCol(27)}>offReb-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(28)}>defReb</button>
					<button className='button is-text' onClick={() => this.displayCol(29)}>defReb-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(30)}>reb</button>
					<button className='button is-text' onClick={() => this.displayCol(31)}>reb-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(32)}>ast</button>
					<button className='button is-text' onClick={() => this.displayCol(33)}>ast-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(34)}>pts</button>
					<button className='button is-text' onClick={() => this.displayCol(35)}>pts-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(36)}>tov</button>
					<button className='button is-text' onClick={() => this.displayCol(37)}>tov-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(38)}>stl</button>
					<button className='button is-text' onClick={() => this.displayCol(39)}>stl-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(40)}>blk</button>
					<button className='button is-text' onClick={() => this.displayCol(41)}>blk-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(42)}>blkAgainst</button>
					<button className='button is-text' onClick={() => this.displayCol(43)}>blkAgainst-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(44)}>ptsAgainst</button>
					<button className='button is-text' onClick={() => this.displayCol(45)}>ptsAgainst-Avg</button>
					<button className='button is-text' onClick={() => this.displayCol(46)}>gamesBack</button>
					<button className='button is-text' onClick={() => this.displayCol(47)}>gamesPlayed</button>
				</div>
				<br />
        <StatsTeamDraggableTable
          rows={this.createTeamObj(this.state.teams)}
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

export default connect(mapStateToProps)(StatsTeamsTable);
