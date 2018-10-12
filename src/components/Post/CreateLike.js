import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { List, Tooltip, Icon, Card, Row, Col } from 'antd'
import IconText from './IconText'
import { FEED_QUERY } from '../Feed/FeedPage'
class CreateLike extends Component {
  updateStoreAfterVote = (store, createLike, postId) => {
    // const isNewPage = this.props.location.pathname.includes('new')
    // const page = parseInt(this.props.match.params.page, 10)
    // const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0
    // const first = isNewPage ? LINKS_PER_PAGE : 100
    // const orderBy = isNewPage ? 'createdAt_DESC' : null
    // const data = store.readQuery({ query: FEED_QUERY })
    // const votedLink = data.feed.find(post => post.id === postId)
    // votedLink.votes = createVote.link.votes
    // store.writeQuery({ query: FEED_QUERY, data })
  }

  render() {
    return (
      <Mutation
        mutation={LIKE_MUTATION}
        variables={{ postId: this.props.post.id }}
        // update={(store, { data: { createLike } }) =>
        //   this.updateStoreAfterVote(store, createLike, this.props.postId)
        // }
        optimisticResponse={{
          __typename: 'Mutation',
          createLike: {
            __typename: 'Like',

            id: this.props.post.id,
            post: this.props.post,
            likes: this.props.post.likes.concat({ id: 'vcjsvdcjscd' }),
          },
        }}
      >
        {likeMutation => (
          <IconText
            type="like-o"
            text={this.props.likes}
            theMutation={likeMutation}
          />
        )}
      </Mutation>
    )
  }
}
export default CreateLike

const LIKE_MUTATION = gql`
  mutation LIKE_MUTATION($postId: ID!) {
    createLike(postId: $postId) {
      id
      post {
        id
        title
        text
        createdAt
        # author {
        #   id
        # }
        likes {
          id
          #   user {
          #     id
          #   }
        }
      }
    }
  }
`

// const LIKE_MUTATION = gql`
//   mutation LIKE_MUTATION($postId: ID!) {
//     createLike(postId: $postId) {
//       id
//       post {
//         id
//         title
//         text
//         createdAt
//         author {
//           id
//           name
//         }
//         likes {
//           id
//           post {
//             text
//           }
//           user {
//             id
//             name
//           }
//         }
//       }
//     }
//   }
// `
