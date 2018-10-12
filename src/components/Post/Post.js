import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { List, Avatar, Icon, Card, Row, Col } from 'antd'
import moment from 'moment'
import CreateLike from './CreateLike'

const IconText = ({ type, text }) => (
  <a className="ph2 flex items-center">
    <Icon type={type} />
    <span className="pl1">{text}</span>
  </a>
)
class Post extends Component {
  render() {
    // let title = this.props.post.title
    // if (this.props.isDraft) {
    //   title = `${title} (Draft)`
    // }
    const post = this.props.post
    const { title, text, createdAt, likes, id } = this.props.post
    return (
      <Col xs={24} sm={24} md={12} lg={12}>
        <article className="mt3 bg-white br1 h4 flex shadow-3 grow  justify-between">
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
                <CreateLike post={post} />
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

export default Post
