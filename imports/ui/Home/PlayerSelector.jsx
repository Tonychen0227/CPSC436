import React, { Component } from 'react';
import { render } from 'react-dom';
import SelectSearch from 'react-select-search';
import MyMVP from './MyMVP';
import '../../css/PlayerSelector.css';

export default class PlayerSelector extends Component {
    state = {
        selectedOption: 'Lebron James',
        players: [
          {name: 'Stephen Curry', value: 'AF'},
          {name: 'Klay Thompson', value: 'AX'},
          {name: 'Lebron James', value: 'AL'},
          {name: 'Kyle Lorry', value: 'DZ'},
          {name: 'asdv', value: 'AS'},
          {name: 'ergb', value: 'AD'},
          {name: '4gwerta', value: 'AO'},
          {name: 'ggdgfa', value: 'AI'}
        ]
    };

    handleChange = (selectedOption) => {
      this.setState({ selectedOption });
      console.log(selectedOption);
    }

    render() {
        return (
            <div>
                <SelectSearch
                    name="player"
                    mode="input"
                    value={this.state.selectedOption}
                    options={this.state.players}
                    placeholder="switch"
                    onChange={this.handleChange}
                />
                <MyMVP />
            </div>
        );
    }
}