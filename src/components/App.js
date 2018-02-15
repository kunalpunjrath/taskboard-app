import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  NavLink,
  Link,
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
        {/* <nav className='pa3 pa4-ns'>
            <Link
            className='link dim black b f6 f5-ns dib mr3'
            to='/'
            title='Feed'
            >
            Blog
            </Link>
            <NavLink
            className='link dim f6 f5-ns dib mr3 black'
            activeClassName='gray'
            exact={true}
            to='/'
            title='Feed'
            >
            Feed
            </NavLink>
            <NavLink
            className='link dim f6 f5-ns dib mr3 black'
            activeClassName='gray'
            exact={true}
            to='/drafts'
            title='Drafts'
            >
            Drafts
            </NavLink>
            <Link
            to='/create'
            className='f6 link dim br1 ba ph3 pv2 fr mb2 dib black'
            >
            + Create Draft
            </Link>
        </nav> */}
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
              {/* <Route path='/board/:id' component={DetailPage} /> */}
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