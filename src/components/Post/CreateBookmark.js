import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { List, Tooltip, Icon, Card, Row, Col } from 'antd'
import IconText from './IconText'
import { FEED_QUERY } from '../Feed/FeedPage'
import { ME_QUERY } from '../User'

class CreateBookmark extends Component {
  render() {
    const { id } = this.props.post
    const { bookmarked } = this.props
    return (
      <Mutation
        mutation={BOOKMARK_MUTATION}
        variables={{ postId: id }}
        update={(cache, { data: { createBookmark } }, id) => {
          const data = cache.readQuery({
            query: ME_QUERY,
          })
          console.log(createBookmark)
          console.log(data)
          data.me.bookmarks = data.me.bookmarks.concat(createBookmark)
          cache.writeQuery({
            query: ME_QUERY,
            data,
          })
        }}
      >
        {bookmarkMutation => (
          <IconText
            type="book"
            theme={bookmarked}
            theMutation={bookmarkMutation}
          />
        )}
      </Mutation>
    )
  }
}
export default CreateBookmark

const BOOKMARK_MUTATION = gql`
  mutation BOOKMARK_MUTATION($postId: ID!) {
    createBookmark(postId: $postId) {
      id
      post {
        id
        title
        text
        createdAt
        # author {
        #   id
        # }
        # bookmark {
        #   id
        #   user {
        #     id
        #   }
        # }
      }
    }
  }
`

// update={(store, { data: { createLike } }) =>
//   this.updateStoreAfterVote(store, createLike, this.props.postId)
// }
// optimisticResponse={{
//   __typename: 'Mutation',
//   createLike: {
//     __typename: 'Like',

//     id: this.props.post.id,
//     post: this.props.post,
//     likes: this.props.post.likes.concat({ id: 'vcjsvdcjscd' }),
//   },
// }}
