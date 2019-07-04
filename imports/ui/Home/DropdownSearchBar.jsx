import React from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { options } from "./options";
import Select from "react-dropdown-select";

export class DropdownSearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      multi: true,
      noDataRenderer: true,
      selectValues: [],
      searchBy: "name",
      clearable: true,
      searchable: true,
      handle: true,
      addPlaceholder: "+ compare more!!!",
      labelField: "name",
      valueField: "name",
      color: "#0074D9",
      keepSelectedInList: true,
      dropdownPosition: "auto",
      direction: "ltr",
      dropdownHeight: "300px"
    };
  }

  setValues = selectValues => this.setState({ selectValues });

  noDataRenderer = () => {
    return (
      <p style={{ textAlign: "center" }}>
        <strong>GG!!!</strong> No data found
      </p>
    );
  };

  render() {
    return (
      <div className={this.props.className}>
        <div>
          <div style={{ maxWidth: "350px", margin: "0 auto" }}>
            <StyledSelect
              placeholder="Select peoples"
              addPlaceholder={this.state.addPlaceholder}
              color={this.state.color}
              searchBy={this.state.searchBy}
              clearable={this.state.clearable}
              searchable={this.state.searchable}
              dropdownHandle={this.state.handle}
              dropdownHeight={this.state.dropdownHeight}
              direction={this.state.direction}
              multi={this.state.multi}
              values={[options.find(opt => opt.name === "S Curry")]}
              labelField={this.state.labelField}
              valueField={this.state.valueField}
              options={options}
              dropdownGap={5}
              keepSelectedInList={this.state.keepSelectedInList}
              onDropdownOpen={() => undefined}
              onDropdownClose={() => undefined}
              onClearAll={() => undefined}
              onSelectAll={() => undefined}
              onChange={values => this.setValues(values)}
              noDataLabel="No matches found"
              noDataRenderer={
                this.state.noDataRenderer
                  ? () => this.noDataRenderer()
                  : undefined
              }
              dropdownPosition={this.state.dropdownPosition}
            />
          </div>
        </div>
      </div>
    );
  }
}

const StyledSelect = styled(Select)`
  ${({ dropdownRenderer }) =>
    dropdownRenderer &&
    `
		.react-dropdown-select-dropdown {
			overflow: initial;
		}
	`}
`;

const SearchAndToggle = styled.div`
  display: flex;
  flex-direction: column;

  input {
    margin: 10px 10px 0;
    line-height: 30px;
    padding: 0 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    :focus {
      outline: none;
      border: 1px solid ${({ color }) => color};
    }
  }
`;

const Items = styled.div`
  overflow: auto;
  min-height: 10px;
  max-height: 200px;
`;

const Item = styled.div`
  display: flex;
  margin: 10px;
  align-items: baseline;
  cursor: pointer;
  border-bottom: 1px dotted transparent;

  :hover {
    border-bottom: 1px dotted #ccc;
  }

  ${({ disabled }) =>
    disabled
      ? `
  	opacity: 0.5;
  	pointer-events: none;
  	cursor: not-allowed;
  `
      : ""}
`;

const ItemLabel = styled.div`
  margin: 5px 10px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;

  & div {
    margin: 10px 0 0 10px;
    font-weight: 600;
  }
`;

const Button = styled.button`
  background: none;
  border: 1px solid #555;
  color: #555;
  border-radius: 3px;
  margin: 10px 10px 0;
  padding: 3px 5px;
  font-size: 10px;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;

  &.clear {
    color: tomato;
    border: 1px solid tomato;
  }

  :hover {
    border: 1px solid deepskyblue;
    color: deepskyblue;
  }
`;

const StyledHtmlSelect = styled.select`
  padding: 0;
  margin: 0 0 0 10px;
  height: 23px !important;
  color: #0071dc;
  background: #fff;
  border: 1px solid #0071dc;
`;

const StyledInput = styled.input`
  margin: 0 0 0 10px;
  height: 23px !important;
  color: #0071dc;
  background: #fff;
  border: 1px solid #0071dc;
  border-radius: 3px;
  padding: 13px 10px;
  width: 70px;
`;

export default DropdownSearchBar;
