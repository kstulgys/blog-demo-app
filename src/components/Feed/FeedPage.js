import React, { Component, Fragment } from 'react'
import './index.css'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { List, Avatar, Icon, Card, Row, Col } from 'antd'
import moment from 'moment'
import Post from '../Post/Post'
const { Meta } = Card

const FeedPage = ({ data, loading, error }) => {
  if (loading) return <h1>Show spinner...</h1>
  if (error) return <h1>Show error...</h1>
  return (
    <Row type="flex">
      <Col xs={24} lg={18}>
        <Row type="flex" gutter="16" justify="start">
          {data.feed &&
            data.feed.map(post => <Post key={post.id} post={post} />)}
        </Row>
      </Col>
      <Col xs={0} lg={{ span: 5, offset: 1 }}>
        <h1>Liked posts</h1>
      </Col>
    </Row>
  )
}

//************************************************************************************************************

class FeedWithSubscription extends Component {
  componentDidMount() {
    this.props.subscribeToNewFeed()
  }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.userID !== prevProps.userID) {
  //     this.fetchData(this.props.userID)
  //   }
  // }
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
