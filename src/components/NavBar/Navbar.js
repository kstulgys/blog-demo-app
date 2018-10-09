import React, { Component } from 'react'
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
      <div>
        <Link to="/">Main</Link>
      </div>
    )
  }
}

export default Navbar

// <nav className="pa3 pa4-ns">
// <Link className="link dim black b f6 f5-ns dib mr3" to="/" title="Feed">
//   Blog
// </Link>

// {this.props.data &&
//   this.props.data.me &&
//   this.props.data.me.email &&
//   this.state.token && (
//     <NavLink
//       className="link dim f6 f5-ns dib mr3 black"
//       activeClassName="gray"
//       exact={true}
//       to="/drafts"
//       title="Drafts"
//     >
//       Drafts
//     </NavLink>
//   )}
// {this.state.token ? (
//   <div
//     onClick={() => {
//       this.refreshTokenFn &&
//         this.refreshTokenFn({
//           [AUTH_TOKEN]: null,
//         })
//       window.location.href = '/'
//     }}
//     className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
//   >
//     Logout
//   </div>
// ) : (
//   <Link
//     to="/login"
//     className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
//   >
//     Login
//   </Link>
// )}
// </nav>
// {this.props.data &&
//   this.props.data.me &&
//   this.props.data.me.email &&
//   this.state.token && (
//     <Link
//       to="/create"
//       className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
//     >
//       + Create Draft
//     </Link>
//   )}

// <NavLink
//   className="link dim f6 f5-ns dib mr3 black"
//   activeClassName="gray"
//   exact={true}
//   to="/"
//   title="Feed"
// >
//   Feed
// </NavLink>

// renderNavBar() {
//     return (
//       <nav className="pa3 pa4-ns">
//         <Link className="link dim black b f6 f5-ns dib mr3" to="/" title="Feed">
//           Blog
//         </Link>
//         <NavLink
//           className="link dim f6 f5-ns dib mr3 black"
//           activeClassName="gray"
//           exact={true}
//           to="/"
//           title="Feed"
//         >
//           Feed
//         </NavLink>
//         {this.props.data &&
//           this.props.data.me &&
//           this.props.data.me.email &&
//           this.state.token && (
//             <NavLink
//               className="link dim f6 f5-ns dib mr3 black"
//               activeClassName="gray"
//               exact={true}
//               to="/drafts"
//               title="Drafts"
//             >
//               Drafts
//             </NavLink>
//           )}
//         {this.state.token ? (
//           <div
//             onClick={() => {
//               this.refreshTokenFn &&
//                 this.refreshTokenFn({
//                   [AUTH_TOKEN]: null,
//                 })
//               window.location.href = '/'
//             }}
//             className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
//           >
//             Logout
//           </div>
//         ) : (
//           <Link
//             to="/login"
//             className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
//           >
//             Login
//           </Link>
//         )}
//         {this.props.data &&
//           this.props.data.me &&
//           this.props.data.me.email &&
//           this.state.token && (
//             <Link
//               to="/create"
//               className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
//             >
//               + Create Draft
//             </Link>
//           )}
//       </nav>
//     )
//   }
