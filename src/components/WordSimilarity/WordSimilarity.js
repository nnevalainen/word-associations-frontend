import React, { Component } from 'react';

import { Statistic, Alert, Icon } from 'antd';

import { WrappedHorizontalLoginForm } from './HorizontalForm';
import Client from '../../requestUtils';

const INITIAL_STATE = {errorMsg:'', similarity: -1, pendingRequest: false};

class WordSimilarity extends Component {

  constructor(props) {
    super(props)
    
    this.client = new Client();
    this.state = { ...INITIAL_STATE}
  }

  submitForm = async values => {
    
    this.setState({ pendingRequest: true});

    try {
      const response = await this.client.get('similarity', values);
      this.setState({ similarity: response.data.similarity})
    } catch(err) {
      const message = err.response ? err.response.data.message : err.message;
      this.setState({errorMsg: message, similarity: -1})
    } finally {
      this.setState({ pendingRequest: false });
    }
  }

  render() {

    const { errorMsg, similarity, pendingRequest } = this.state;

    return (
      <div>
        <h2>Word Word Algebra</h2>
        {pendingRequest && <Icon type="loading" />}
        <WrappedHorizontalLoginForm submitForm={this.submitForm}/>
        {errorMsg &&
        <Alert type="error" message={errorMsg} />
        }
        {similarity > 0 &&
        <Statistic title="Similarity" value={similarity}></Statistic>
        }

      </div>
    );
  }
}


export {
  WordSimilarity
}