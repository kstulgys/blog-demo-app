import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

class User extends Component {
  render() {
    return (
      <Query query={ME_QUERY}>
        {({ data: { me }, loading, error }) => {
          //   if (loading) return <div>Loading User...</div>
          if (error) return <div>Error in User...</div>
          return this.props.children({
            me,
          })
        }}
      </Query>
    )
  }
}

export default User

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
      name
    }
  }
`
