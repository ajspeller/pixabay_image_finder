import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';

class Search extends Component {
  state = {
    searchText: '',
    amount: 15,
    apiUrl: 'https://pixabay.com/api',
    apiKey: '712116-71faf1ccff3e34ae18aa1174e',
    images: []
  };

  onTextChange = event => {
    const val = event.target.value;
    this.setState(
      {
        [event.target.name]: val
      },
      () => {
        if (!val) {
          this.setState({ images: [] });
        } else {
          axios
            .get(
              `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
                this.state.searchText
              }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
            )
            .then(res => this.setState({ images: res.data.hits }))
            .catch(err => console.log(err));
        }
      }
    );
  };

  onAmountChange = (event, idx, val) =>
    this.setState({
      amount: val
    });

  render() {
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search for Images"
          fullWidth={true}
        />
        <br />
        <SelectField
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
          <MenuItem value={65} primaryText="65" />
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default Search;
