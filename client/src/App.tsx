import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import TableData from './Components/Tables/table';

function App() {
  return (
    <TableData />
  );
}

export default App;
