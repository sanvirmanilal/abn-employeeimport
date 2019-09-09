import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { EmployeeList } from './components/EmployeeList';
import { AddEmployee } from './components/AddNewEmployee'

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
            <Route path='/employeeList' component={EmployeeList} />
            <Route path='/addEmployee' component={AddEmployee} />
            <Route path='/employee/edit/:id' component={AddEmployee} />
      </Layout>
    );
  }
}