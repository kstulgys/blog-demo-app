import React, { Component, Fragment } from 'react'
import './index.css'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { List, Avatar, Icon, Card, Row, Col } from 'antd'
import moment from 'moment'
import Post from '../Post/Post'
import Bookmarked from '../Post/Bookmarked'
const { Meta } = Card

const FeedPage = ({ data, loading, error }) => {
  if (loading) return <h1>Show spinner...</h1>
  if (error) return <h1>Show error...</h1>
  return (
    <Row type="flex">
      <Col xs={24} lg={{ span: 14, offset: 2 }}>
        <Row type="flex" gutter="50" justify="start">
          {data.feed &&
            data.feed.map(post => <Post key={post.id} post={post} />)}
        </Row>
      </Col>
      <Col xs={0} lg={{ span: 7, offset: 1 }}>
        <Bookmarked />
      </Col>
    </Row>
  )
}

//************************************************************************************************************

class FeedWithSubscription extends Component {
  componentDidMount() {
    this.props.subscribeToNewFeed()
    this.props.subscribeToNewLike()
  }

  render() {
    return <FeedPage {...this.props} />
  }
}

const FeedWithData = () => (
  <Query query={FEED_QUERY}>
    {({ subscribeToMore, ...result }) => (
      <FeedWithSubscription
        {...result}
        subscribeToNewFeed={() =>
          subscribeToMore({
            document: FEED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev
              const newPost = subscriptionData.data.feedSubscription.node
              if (prev.feed.find(post => post.id === newPost.id)) {
                return prev
              }
              return {
                ...prev,
                feed: [...prev.feed, newPost],
              }
            },
          })
        }
        subscribeToNewLike={() =>
          subscribeToMore({
            document: NEW_LIKE_SUBSCRIPTION,
          })
        }
      />
    )}
  </Query>
)
export default FeedWithData

export const FEED_QUERY = gql`
  query FEED_QUERY {
    feed {
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
          name
        }
      }
    }
  }
`
const FEED_SUBSCRIPTION = gql`
  subscription FEED_SUBSCRIPTION {
    feedSubscription {
      node {
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
            name
          }
        }
      }
      mutation
    }
  }
`

const NEW_LIKE_SUBSCRIPTION = gql`
  subscription {
    likeSubscription {
      node {
        id
        post {
          id
          title
          text
          createdAt
          author {
            id
            name
          }
          likes {
            id
            user {
              id
            }
          }
        }
        # user {
        #   id
        # }
      }
      mutation
    }
  }
`

// <List
//   itemLayout="vertical"
//   dataSource={data.feed}
//   renderItem={item => (
//     <List.Item
//       style={{
//         // backgroundColor: 'white',
//         height: 200,
//       }}
//       // grid={{ gutter: 16, xl: 11, offset: 6 }}
//       key={item.id}
//       actions={[
// <IconText type="like-o" text="156" />,
// <IconText type="book" theme="outlined" />,
// <IconText type="message" text="2" />,
//       ]}
//       extra={
//         <img
//           height={200}
//           alt="logo"
//           src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
//         />
//       }
//     >
//       <List.Item.Meta
//         avatar={
//           <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
//         }
//         title={<a href={item.href}>{item.title}</a>}
//       />

//       {item.text}
//     </List.Item>
//   )}
// />
