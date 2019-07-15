import React, { Component } from "react";
import ReactTable, { ReactTableDefaults } from "react-table";
import "react-table/react-table.css";
import Popup from "reactjs-popup";
import SinglePlayerGraph from "./SinglePlayerGraph";
import SinglePlayerFundeDataGraph from './SinglePlayerFundeDataGraph';

Object.assign(ReactTableDefaults, {
  defaultPageSize: 10,
  minRows: 3
});

class StatsPlayerDraggableTable extends Component {
  constructor(props) {
    super(props);
    this.dragged = null;
    this.reorder = [];
    this.state = {
      trigger: 0,
      showPopUp: false,
      popUpData: null
    };
  }
  mountEvents() {
    const headers = Array.prototype.slice.call(
      document.querySelectorAll(".draggable-header")
    );

    headers.forEach((header, i) => {
      header.setAttribute("draggable", true);
      //the dragged header
      header.ondragstart = e => {
        e.stopPropagation();
        this.dragged = i;
      };

      header.ondrag = e => e.stopPropagation;

      header.ondragend = e => {
        e.stopPropagation();
        setTimeout(() => (this.dragged = null), 1000);
      };

      //the dropped header
      header.ondragover = e => {
        e.preventDefault();
      };

      header.ondrop = e => {
        e.preventDefault();
        const { target, dataTransfer } = e;
        this.reorder.push({ a: i, b: this.dragged });
        this.setState({ trigger: Math.random() });
      };
    });
  }
  componentDidMount() {
    this.mountEvents();
  }

  componentDidUpdate() {
    this.mountEvents();
  }

  render() {
    const { rows, columns } = this.props;
    const cols = columns.map(col => ({
      ...col,
      Header: <span className="draggable-header">{col.Header}</span>
    }));

    //run all reorder events
    this.reorder.forEach(o => cols.splice(o.a, 0, cols.splice(o.b, 1)[0]));

    //render
    return (
      <div className="esr-table">
        <ReactTable
          {...this.props}
          data={rows}
          columns={cols}
          SubComponent={row => {
            var selectedInfo = row.original;
            var newData = [];
            var playerInfo = [];
            var foundaData = [];
            Object.keys(selectedInfo).forEach((e) => {
              if (e === 'blkAgainstPerGame' || e === 'stlPerGame' || e === 'tovPerGame' ||
                  e === 'fg2PtAttPerGame' || e === 'fg2PtMadePerGame' || e === 'fg3PtAttPerGame' ||
                  e === 'fg3PtMadePerGame' || e === 'fgAttPerGame' || e === 'fgMadePerGame' ||
                  e === 'ftAttPerGame' || e === 'ftMadePerGame' || e === 'astPerGame' ||
                  e === 'ptsPerGame' || e === 'defRebPerGame' || e === 'offRebPerGame' ||
                  e === 'rebPerGame') {
                newData.push({stats: e.toString(), cost: selectedInfo[e]});
              };
              if (e === 'height' || e === 'weight' || e === 'season' ||
                  e === 'gamesPlayed' || e === 'firstName' ||
                  e === 'lastName' || e === 'birthDate') {
                playerInfo.push({type: e.toString(), value: selectedInfo[e]});
              };
              if (e === 'blk' || e === 'stl' || e === 'pts' || e === 'ast' || e === 'reb') {
                foundaData.push({name: e.toString(), value: selectedInfo[e]});
              }
            });
            return (
              <div className="row">
                <div className="col-sm-2">
                  <div className="card text-white bg-secondary border-secondary mb-3">
                    <ul className="list-group list-group-flush">
                      {playerInfo.map(info => (
                        <li key={info.type}>{info.type} : {info.value}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="card bg-dark mb-3 text-white">
                    <p> Fundamental Stats </p>
                    <SinglePlayerFundeDataGraph data={foundaData} />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card bg-light mb-3 border-light">
                    <SinglePlayerGraph selectedPlayerInfo={newData} />
                  </div>
                </div>
              </div>
            )
          }}
          />
      </div>
    );
  }
}

export default StatsPlayerDraggableTable;
