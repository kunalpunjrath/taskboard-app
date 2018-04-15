import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import Dashboard from './Dashboard'
// import DraftsPage from './DraftsPage'
//import CreatePage from './CreatePage'
// import DetailPage from './DetailPage'

//import { MuiThemeProvider } from 'material-ui/styles'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Board from './Board/Board'

const styles = {
  root: {
    width: '100%',
  },
}

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <Router>
        <Fragment>
        <div className={classes.root}>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='title' color='inherit'>
                Taskboard
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div className='fl w-100 app-wrapper'>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              {/* <Route path='/drafts' component={DraftsPage} /> */}
              {/* <Route path='/create' component={CreatePage} /> */}
              <Route path='/board/:id' component={Board} />
            </Switch>
        </div>
        </Fragment>
      </Router>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)