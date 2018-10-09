import React, { Component, Fragment } from 'react'
import Post from '../Post'
import { graphql, Query } from 'react-apollo'
import { gql } from 'apollo-boost'

const FeedPage = ({ data, loading, error }) => (
  <Fragment>
    {loading && <div>Fetching</div>}
    {error && <div>Error</div>}
    <h1>Feed</h1>
    {data.feed &&
      data.feed.map(post => (
        <Post
          key={post.id}
          post={post}
          refresh={() => this.props.feedQuery.refetch()}
          isDraft={!post.isPublished}
        />
      ))}
  </Fragment>
)

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
