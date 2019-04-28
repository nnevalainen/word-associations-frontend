import React, { Component } from 'react';

import { Table, Alert, Icon } from 'antd';

import Client from '../../requestUtils';
import { WrappedHorizontalLoginForm } from './HorizontalForm'

const COLUMNS = [{
  title: 'Word',
  dataIndex: 'word',
  key: 'word',
}, {
  title: 'Similarity',
  dataIndex: 'similarity',
  key: 'similarity',
}];

const INITIAL_STATE = {pendingRequest: false};

class WordAlgebra extends Component {

  constructor(props) {
    super(props)

    this.client = new Client();
    this.state = { ...INITIAL_STATE}
  }

  submitForm = async values => {
    
  
    try {
      this.setState({pendingRequest: true})
      const response = await this.client.get('similar2', {
        p1: values.plusWord1,
        p2: values.plusWord2,
        m1: values.minusWord,
        n:10})
      
      const words = response.data.words.map((val, idx) => ({word: val[0], similarity:val[1], key:idx}))
  
      this.setState({
        errorMsg: '',
        words: words,
      })
    
    } catch(err) {
      const message = err.response ? err.response.data.message : err.message;
      this.setState({errorMsg: message, words:[]})
    }

    finally {
      this.setState({ pendingRequest: false })
    }

  }

  render() {

    const { errorMsg, words, pendingRequest } = this.state;

    return (
      <div>
        <h2>Word Algebra</h2>
        {pendingRequest && <Icon type="loading" />}
        <WrappedHorizontalLoginForm submitForm={this.submitForm}/>
        {errorMsg &&
        <Alert type="error" message={errorMsg}></Alert>
        }
        <Table
          columns={COLUMNS}
          dataSource={words}
        />

      </div>
    );
  }
}

export {
  WordAlgebra
}