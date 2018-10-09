import React, { Component, Fragment } from 'react'
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import User from '../User'
import {} from 'antd'

import { Menu, Icon, Input, Divider, Avatar } from 'antd'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const Search = Input.Search

class Navbar extends Component {
  render() {
    return (
      <User>
        {({ me }) => (
          <Menu
            mode="horizontal"
            style={{
              display: 'flex',
            }}
          >
            <div style={{ flex: 0.33 }} />
            <Link
              to="/"
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                textDecoration: 'none',
              }}
            >
              <h1 style={{ margin: 0 }}>ReMedium</h1>
            </Link>
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{ width: 200, paddingTop: 5, paddingBottom: 5 }}
            />
            <SubMenu
              style={{ marginRight: '5%' }}
              title={
                <span className="submenu-title-wrapper">
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </span>
              }
            >
              <Menu.Item key="setting:1">create post</Menu.Item>
              <Menu.Item key="setting:2">drafts</Menu.Item>
              <Menu.Item key="setting:3">liked posts</Menu.Item>
              <Menu.Item key="setting:4">bookmarks</Menu.Item>
              <Divider style={{ margin: 0 }} />
              <Menu.Item key="setting:5">profile</Menu.Item>
              <Menu.Item key="setting:6">log out</Menu.Item>
            </SubMenu>
          </Menu>
        )}
      </User>
    )
  }
}

{
  /* <Fragment>
<Link to="/">Main</Link>
<Link to="/">Search</Link>
{me ? <Link to="/">Profile</Link> : <Link to="/">Sign in</Link>}
</Fragment> */
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
