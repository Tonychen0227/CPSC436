import React, { Component } from "react";
import ReactTable, { ReactTableDefaults } from "react-table";
import "react-table/react-table.css";
import Popup from "reactjs-popup";
import SinglePlayerGraph from "./SinglePlayerGraph";

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
            console.log(row)
            var selectedInfo = row.original;
            var newData = [];
            Object.keys(selectedInfo).forEach((e) => {
              if (typeof selectedInfo[e] !== 'string') {
                newData.push({stats: e.toString(), cost: selectedInfo[e]})
              }
            });
            console.log(newData);
            return (
              <div>
              <SinglePlayerGraph selectedPlayerInfo={newData} />
              </div>
            )
          }}
          />
      </div>
    );
  }
}

export default StatsPlayerDraggableTable;