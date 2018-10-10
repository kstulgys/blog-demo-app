import React, { Component, Fragment } from 'react'
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import {
  Menu,
  Icon,
  Input,
  Divider,
  Avatar,
  Form,
  Button,
  Checkbox,
} from 'antd'

import User from '../User'
import CreatePost from '../Post/CreatePost'
import LogIn from '../LogIn'

const FormItem = Form.Item
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
              style={{
                width: 200,
                paddingTop: 5,
                paddingBottom: 5,
                marginRight: '1%',
              }}
            />
            {me ? (
              <SubMenu
                style={{ marginRight: '5%' }}
                title={
                  <span className="submenu-title-wrapper">
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  </span>
                }
              >
                <Menu.Item key="setting:1">
                  <CreatePost>
                    {({ showModal }) => (
                      <p style={{ margin: 0, padding: 0 }} onClick={showModal}>
                        create post
                      </p>
                    )}
                  </CreatePost>
                </Menu.Item>
                <Menu.Item key="setting:2">drafts</Menu.Item>
                <Menu.Item key="setting:3">liked posts</Menu.Item>
                <Menu.Item key="setting:4">bookmarks</Menu.Item>
                <Divider style={{ margin: 0 }} />
                <Menu.Item key="setting:5">profile</Menu.Item>
                <Menu.Item key="setting:6">log out</Menu.Item>
              </SubMenu>
            ) : (
              <Menu.Item key="setting:7" style={{ marginRight: '5%' }}>
                <LogIn>
                  {({ showModal }) => (
                    <span onClick={showModal} style={{ margin: 0, padding: 0 }}>
                      Log in
                    </span>
                  )}
                </LogIn>
              </Menu.Item>
            )}
          </Menu>
        )}
      </User>
    )
  }
}

export default Navbar
