import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

export const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      email
      name
    }
  }
`
const User = props => (
  <Query query={ME_QUERY}>
    {({ data: { me }, loading, error }) =>
      // if (loading) return <div>Loading User...</div>
      // if (error) return <div>Error in User...</div>
      // console.log(me)

      props.children({
        me,
      })
    }
  </Query>
)

export default User
