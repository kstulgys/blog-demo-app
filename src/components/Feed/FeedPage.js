import React, { Component, Fragment } from 'react'
// import Post from '../Post'
import './index.css'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { List, Avatar, Icon, Card, Row, Col } from 'antd'
import moment from 'moment'
const { Meta } = Card

const IconText = ({ type, text, paddingL }) => (
  <a className="ph2 flex items-center">
    <Icon type={type} />
    <span className="pl1">{text}</span>
  </a>
)

const FeedPage = ({ data, loading, error }) => {
  if (loading) return <h1>Show spinner...</h1>
  if (error) return <h1>Show error...</h1>

  return (
    <Row type="flex">
      <Col
        xs={24}
        // sm={{ span: 20, push: 2 }}
        // md={{ span: 20, push: 2 }}
        lg={18}
      >
        <Row type="flex" gutter="16" justify="start">
          {data.feed.map(post => (
            <Col xs={24} sm={24} md={12} lg={12}>
              <article className="mt3 bg-white br1 h4 flex shadow-1 grow  justify-between">
                <div className="pa2 flex w-100 flex-column justify-between">
                  <h3 className="ttu pl2 ma0">{post.title}</h3>
                  <p className="w-100 pl2 block-with-text ma0">{post.text}</p>
                  <div className="flex justify-between mb0 pb0">
                    <div>
                      <p className="ma0 pl2">
                        {moment(post.createdAt).format('MMM Do YY')}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <IconText type="like-o" text="156" />
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
          ))}
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
              return Object.assign({}, prev, {
                feed: [...prev.feed, newPost],
              })
            },
          })
        }
      />
    )}
  </Query>
)
export default FeedWithData

const FEED_QUERY = gql`
  query FEED_QUERY {
    feed {
      id
      text
      title
      createdAt
      isPublished
      author {
        name
      }
    }
  }
`
const FEED_SUBSCRIPTION = gql`
  subscription FEED_SUBSCRIPTION {
    feedSubscription {
      node {
        id
        text
        title
        isPublished
        author {
          name
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
