import React, { Component } from 'react';

import { Tabs } from 'antd';

import { MostSimilar } from '../components/MostSimilar';
import { WordSimilarity } from '../components/WordSimilarity';
import { WordAlgebra } from '../components/WordAlgebra';

const TabPane = Tabs.TabPane;

class LandingPage extends Component {
  
  render() {
    return (
      <div>
        <h1>Words2Vec Demos</h1>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Most Similar Words" key="1">
           <MostSimilar/>
          </TabPane>
          <TabPane tab="Word Similarity" key="2">
            <WordSimilarity />
          </TabPane>
          <TabPane tab="Word Algebra" key="3">
            <WordAlgebra />
          </TabPane>
        </Tabs>,
      </div>
    )
  }
}

export {
  LandingPage
}