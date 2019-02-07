import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import TestComponent from './components/TestComponent'

import data from './data.json'

const RouteWithMeta = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={routeProps => (
      <Fragment>
        <Component {...routeProps} {...props} />
      </Fragment>
    )}
  />
)

class App extends Component {
  state = {
    data
  }

  getDocument = (collection, name) =>
    this.state.data[collection] &&
    this.state.data[collection].filter(page => page.name === name)[0]

  getDocuments = collection => this.state.data[collection] || []

  render() {
    return (
      <Router>
        <div className='React-Wrap'>
          <TestComponent />
        </div>
      </Router>
    )
  }
}

export default App
