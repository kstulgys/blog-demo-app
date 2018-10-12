import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { List, Avatar, Icon, Card, Row, Col } from 'antd'
import moment from 'moment'
const { Meta } = Card

const IconText = ({ type, text, likeMutation }) => (
  <a className="ph2 flex items-center" onClick={likeMutation}>
    <Icon type={type} onClick={likeMutation} />
    <span className="pl1">{text}</span>
  </a>
)
class Post extends Component {
  render() {
    // let title = this.props.post.title
    // if (this.props.isDraft) {
    //   title = `${title} (Draft)`
    // }
    const { title, text, createdAt, likes, id } = this.props.post
    return (
      <Col xs={24} sm={24} md={12} lg={12}>
        <article className="mt3 bg-white br1 h4 flex shadow-1 grow  justify-between">
          <div className="pa2 flex w-100 flex-column justify-between">
            <h3 className="ttu pl2 ma0">{title}</h3>
            <p className="w-100 pl2 block-with-text ma0">{text}</p>
            <div className="flex justify-between mb0 pb0">
              <div>
                <p className="ma0 pl2">
                  {moment(createdAt).format('MMM Do YY')}
                </p>
              </div>
              <div className="flex justify-between">
                <Mutation
                  mutation={LIKE_MUTATION}
                  variables={{ postId: id }}
                  // update={(store, { data: { vote } }) =>
                  //   this.props.updateStoreAfterVote(store, vote, this.props.link.id)
                  // }
                >
                  {likeMutation => (
                    <IconText
                      type="like-o"
                      text={likes.length}
                      likeMutation={likeMutation}
                    />
                  )}
                </Mutation>
                <IconText type="book" theme="outlined" />
                <IconText type="message" text="2" />
              </div>
            </div>
          </div>

          <img
            className="h4"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            alt="night sky over water"
          />
        </article>
      </Col>
    )
  }
}

const LIKE_MUTATION = gql`
  mutation LIKE_MUTATION($postId: ID!) {
    createLike(postId: $postId) {
      id
      post {
        author {
          id
          name
        }
        id
        title
        text
        createdAt
        author {
          name
        }
        likes {
          id
          post {
            text
          }
          user {
            id
            name
          }
        }
      }
    }
  }
`

// const FEED_QUERY = gql`
//   query FEED_QUERY {
//     feed {
//       id
//       title
//       text
//       createdAt
//       likes
//       author {
//         name
//       }
//       likes {
//         id
//         post {
//           text
//         }
// user {
//   name
// }
//       }
//     }
//   }
// `

export default Post
