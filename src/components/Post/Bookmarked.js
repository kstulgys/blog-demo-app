import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { List, Tooltip, Icon, Card, Row, Col } from 'antd'
import User from '../User'

class Bookmarked extends Component {
  render() {
    return (
      <ul>
        <User>
          {({ data, loading }) => {
            if (loading) return <h1>Loading...</h1>

            return (
              data.me &&
              data.me.bookmarks.map(book => <li>{book.post.title}</li>)
            )
          }}
        </User>
      </ul>
    )
  }
}

export default Bookmarked
