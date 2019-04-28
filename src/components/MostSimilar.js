import React, { Component } from 'react';

import { Alert, Input, Table, Icon } from 'antd';

import Client from '../requestUtils';

const INITIAL_STATE = {
  errorMsg: '',
  n: 10,
  words: [],
  pendingRequest: false
}

const COLUMNS = [{
  title: 'Word',
  dataIndex: 'word',
  key: 'word',
}, {
  title: 'Similarity',
  dataIndex: 'similarity',
  key: 'similarity',
}];

class MostSimilar extends Component {
  
  constructor(props) {
    super(props);
    
    this.client = new Client();
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = async e => {
    const searchTerm = e.target.value;
    
    this.setState({ pendingRequest: true });

    try {
      const response = await this.client.get('similar', {searchTerm, n:10})
      
      const words = response.data.words.map((val, idx) => ({word: val[0], similarity:val[1], key:idx}))
      const resultsFor = response.data.searchTerm;

      this.setState({
        errorMsg: '',
        words: words,
        resultsFor: resultsFor,
      })
    
    } catch(err) {

      const message = err.response ? err.response.data.message : err.message;
      this.setState({errorMsg: message, words:[]})
    } finally {
      this.setState({ pendingRequest : false });
    }
    
  };

  render() {

    const { words, errorMsg, pendingRequest } = this.state;

    return (
      <div>
        <h2>Get most similar words</h2>
        {pendingRequest && <Icon type="loading" />}
        <Input
          placeholder="Finland"
          size="default"
          allowClear
          onPressEnter={this.onSubmit}
        />
        {errorMsg &&
        <Alert type="error" message={errorMsg} />
        }
        <Table
          columns={COLUMNS}
          dataSource={words}
        />
      </div>
    )
  }
}

export {
  MostSimilar
}
