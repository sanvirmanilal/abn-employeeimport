import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { EmployeeList } from './components/EmployeeList';
import { AddEmployee } from './components/AddNewEmployee'

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/employeeList' component={EmployeeList} />
            <Route path='/addEmployee' component={AddEmployee} />
            <Route path='/employee/edit/:id' component={AddEmployee} />
      </Layout>
    );
  }
}