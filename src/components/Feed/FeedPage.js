import React, { Component, Fragment } from 'react'
// import Post from '../Post'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { List, Avatar, Icon, Card } from 'antd'
const { Meta } = Card

const listData = []
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  })
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

const FeedPage = ({ data, loading, error }) => (
  <List
    // size="small"
    itemLayout="vertical"
    dataSource={listData}
    renderItem={item => (
      <List.Item
        style={{ padding: 0, margin: 20 }}
        key={item.title}
        actions={[
          <IconText type="like-o" text="156" />,
          <IconText type="book" theme="outlined" />,
          <IconText type="message" text="2" />,
        ]}
        extra={
          <img
            style={{ height: 200 }}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={<a href={item.href}>{item.title}</a>}
          // description={item.description}
        />
        <div style={{ height: 100 }}>{item.content}</div>
      </List.Item>
    )}
  />
)

//************************************************************************************************************

class FeedWithSubscription extends Component {
  componentDidMount() {
    this.props.subscribeToNewFeed()
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID)
    }
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
  query FeedQuery {
    feed {
      id
      text
      title
      isPublished
      author {
        name
      }
    }
  }
`
const FEED_SUBSCRIPTION = gql`
  subscription FeedSubscription {
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

// {this.props.children}
// if (this.props.feedQuery.loading) {
//   return (
//     <div className="flex w-100 h-100 items-center justify-center pt7">
//       <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
//     </div>
//   )
// }

// return (
//   <Fragment>
//     <h1>Feed</h1>
//     {this.props.feedQuery.feed &&
//       this.props.feedQuery.feed.map(post => (
//         <Post
//           key={post.id}
//           post={post}
//           refresh={() => this.props.feedQuery.refetch()}
//           isDraft={!post.isPublished}
//         />
//       ))}
//     {this.props.children}
//   </Fragment>
// )

// export default graphql(FEED_QUERY, {
//   name: 'feedQuery', // name of the injected prop: this.props.feedQuery...
//   options: {
//     fetchPolicy: 'network-only',
//   },
//   props: props =>
//     Object.assign({}, props, {
//       subscribeToNewFeed: params => {
//         return props.feedQuery.subscribeToMore({
//           document: FEED_SUBSCRIPTION,
//           updateQuery: (prev, { subscriptionData }) => {
//             if (!subscriptionData.data) {
//               return prev
//             }
//             const newPost = subscriptionData.data.feedSubscription.node
//             if (prev.feed.find(post => post.id === newPost.id)) {
//               return prev
//             }
// return Object.assign({}, prev, {
//   feed: [...prev.feed, newPost],
// })
//           },
//         })
//       },
//     }),
// })(FeedPage)

// class FeedPage extends Component {
// componentWillReceiveProps(nextProps) {
//   if (this.props.location.key !== nextProps.location.key) {
//     this.props.feedQuery.refetch()
//   }
// }

// componentDidMount() {
//   this.props.subscribeToNewFeed()
// }

//   render() {
//     if (this.props.feedQuery.loading) {
//       return (
//         <div className="flex w-100 h-100 items-center justify-center pt7">
//           <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
//         </div>
//       )
//     }

//     return (
//       <Fragment>
//         <h1>Feed</h1>
//         {this.props.feedQuery.feed &&
//           this.props.feedQuery.feed.map(post => (
//             <Post
//               key={post.id}
//               post={post}
//               refresh={() => this.props.feedQuery.refetch()}
//               isDraft={!post.isPublished}
//             />
//           ))}
//         {this.props.children}
//       </Fragment>
//     )
//   }
// }
