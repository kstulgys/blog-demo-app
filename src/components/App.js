import React, { Component, Fragment } from 'react'
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import NavBar from './NavBar'
import FeedPage from './Feed/FeedPage'
import DraftsPage from './DraftsPage'
import CreatePage from './CreatePage'
import DetailPage from './DetailPage'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import PageNotFound from './PageNotFound'
import LogoutPage from './LogoutPage'
import { AUTH_TOKEN } from '../constant'
import { isTokenExpired } from '../helper/jwtHelper'
// import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

class ProtectedRoute extends Component {
  render() {
    const token = localStorage.getItem(AUTH_TOKEN)
    const { component: Component, ...rest } = this.props
    return (
      token && (
        <Route {...rest} render={matchProps => <Component {...matchProps} />} />
      )
    )
  }
}

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
      name
    }
  }
`

// }= ({ component: Component, token, ...rest }) => {
//   return token ? (
//     <Route {...rest} render={matchProps => <Component {...matchProps} />} />
//   ) : (
//     <Redirect to="/login" />
//   )
// }

class App extends Component {
  render() {
    const token = localStorage.getItem(AUTH_TOKEN)

    return (
      <Router>
        <Fragment>
          <NavBar />
          <div className="fl w-100 pl4 pr4">
            <Switch>
              <Route exact path="/" component={FeedPage} />
              <ProtectedRoute path="/drafts" component={DraftsPage} />
              <ProtectedRoute path="/create" component={CreatePage} />
              <Route path="/post/:id" component={DetailPage} />
              <Route
                path="/login"
                render={props => (
                  <LoginPage refreshTokenFn={this.refreshTokenFn} />
                )}
              />
              <Route
                path="/signup"
                render={props => (
                  <SignupPage refreshTokenFn={this.refreshTokenFn} />
                )}
              />
              <Route path="/logout" component={LogoutPage} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default App

// export default graphql(ME_QUERY, {
//   options: {
//     errorPolicy: 'all',
//   },
// })(RootContainer)

// constructor(props) {
//   super(props)
//   this.refreshTokenFn = this.refreshTokenFn.bind(this)

//   this.state = {
//     token: props.token,
//   }
// }

// refreshTokenFn(data = {}) {
//   const token = data.AUTH_TOKEN

//   if (token) {
//     localStorage.setItem(AUTH_TOKEN, token)
//   } else {
//     localStorage.removeItem(AUTH_TOKEN)
//   }

//   this.setState({
//     token: data.AUTH_TOKEN,
//   })
// }

// bootStrapData() {
//   try {
//     const token = localStorage.getItem(AUTH_TOKEN)
//     if (token !== null && token !== undefined) {
//       const expired = isTokenExpired(token)
//       if (!expired) {
//         this.setState({ token: token })
//       } else {
//         localStorage.removeItem(AUTH_TOKEN)
//         this.setState({ token: null })
//       }
//     }
//   } catch (e) {
//     console.log('')
//   }
// }

// //verify localStorage check
// componentDidMount() {
//   this.bootStrapData()
// }
