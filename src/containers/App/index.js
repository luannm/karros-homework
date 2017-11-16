import React from 'react';
import { Layout } from 'antd';
import AppHeader from '../AppHeader';
import FilterSection from '../FilterSection';
import ResultSection from '../ResultSection';
import './index.less';

const { Content } = Layout;

const App = () => (
  <Layout>
    <AppHeader className="header" />
    <Content className="content">
      <FilterSection />
      <ResultSection />
    </Content>
  </Layout>
);

export default App;
