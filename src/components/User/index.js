import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

export const ME_QUERY = gql`
  query ME_QUERY {
    me {
      name
      bookmarks {
        id
        post {
          id
          title
        }
      }
    }
  }
`
const User = props => (
  <Query query={ME_QUERY}>
    {({ data, loading, error }) => {
      // if (loading) return <div>Loading User...</div>
      // if (error) return <div>Error in User...</div>
      console.log(data)

      return props.children({
        data,
        loading,
      })
    }}
  </Query>
)

export default User
