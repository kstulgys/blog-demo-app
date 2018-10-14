import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { List, Tooltip, Icon, Card, Row, Col } from 'antd'
import IconText from './IconText'
import { FEED_QUERY } from '../Feed/FeedPage'
import { ME_QUERY } from '../User'
import User from '../User'

class CreateBookmark extends Component {
  render() {
    const postId = this.props.post.id
    // const mutationId = bookmarkId ? bookmarkId : postId
    // console.log('bookmarkId', bookmarkId)
    // console.log('postId', postId)

    return (
      <User>
        {({ data }) => {
          let bookmarkedPost =
            data.me &&
            data.me.bookmarks.filter(item => item.post.id === postId)[0]
          bookmarkedPost = bookmarkedPost ? bookmarkedPost : false
          const bookmarkId = bookmarkedPost && bookmarkedPost.id
          const variables = bookmarkId ? { bookmarkId } : { postId }
          let filledIcon = bookmarkId ? true : false
          // console.log('bookmarkedPost', bookmarkedPost)
          // console.log('bookmarkId', bookmarkId)
          return (
            <Mutation
              mutation={bookmarkId ? UN_BOOKMARK_MUTATION : BOOKMARK_MUTATION}
              variables={variables}
              // refetchQueries={[{ query: FEED_QUERY }]}
              update={(cache, payload) => {
                const data = cache.readQuery({
                  query: ME_QUERY,
                })
                if (payload.data.createBookmark) {
                  const { createBookmark } = payload.data
                  data.me.bookmarks = [...data.me.bookmarks, createBookmark]
                }
                if (
                  payload.data.deleteBookmark &&
                  payload.data.deleteBookmark.id
                ) {
                  filledIcon = false
                  const { deleteBookmark } = payload.data
                  console.log('deleteBookmark', deleteBookmark)
                  data.me.bookmarks = data.me.bookmarks.filter(
                    bm => bm.id !== deleteBookmark.id,
                  )
                }
                console.log('data after', data)
                cache.writeQuery({
                  query: ME_QUERY,
                  data,
                })
              }}
            >
              {bookmarkMutation => (
                <IconText
                  type="book"
                  theme={filledIcon ? 'filled' : 'outlined'}
                  theMutation={bookmarkMutation}
                />
              )}
            </Mutation>
          )
        }}
      </User>
    )
  }
}

export default CreateBookmark

const BOOKMARK_MUTATION = gql`
  mutation BOOKMARK_MUTATION($postId: ID) {
    createBookmark(postId: $postId) {
      id
      post {
        id
        title
        text
        createdAt
        author {
          id
        }
      }
    }
  }
`

const UN_BOOKMARK_MUTATION = gql`
  mutation UN_BOOKMARK_MUTATION($bookmarkId: ID) {
    deleteBookmark(bookmarkId: $bookmarkId) {
      id
      # post {
      #   id
      #   title
      #   text
      #   createdAt
      #   author {
      #     id
      #   }
      # }
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
