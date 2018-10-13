import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { List, Tooltip, Icon, Card, Row, Col } from 'antd'
import User from '../User'

const IconText = ({ type, text, theMutation, theme }) => (
  <User>
    {({ data }) => (
      <a className="ph2 flex items-center" onClick={theMutation}>
        <Tooltip placement="top" title={!data.me && `You must be logged in`}>
          <Icon type={type} theme={theme} />
          <span className="pl1">{text}</span>
        </Tooltip>
      </a>
    )}
  </User>
)

export default IconText
