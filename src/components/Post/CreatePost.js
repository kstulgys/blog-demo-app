import React, { Component, Fragment } from 'react'
import {
  Modal,
  Menu,
  Icon,
  Input,
  Divider,
  Avatar,
  Form,
  Button,
  Checkbox,
} from 'antd'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
const { TextArea } = Input
const FormItem = Form.Item

class CreatePost extends Component {
  state = {
    title: '',
    text: '',
    visible: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  // handleOk = async (e, postMutation) => {
  //   e.preventDefault()
  //   const res = await postMutation()
  //   console.log(res)
  //   this.setState({
  //     visible: false,
  //   })
  // }

  handleCancel = e => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  render() {
    const { title, text } = this.state
    console.log(title, text)
    return (
      <Fragment>
        {this.props.children({
          showModal: this.showModal,
        })}
        <Mutation mutation={DRAFT_MUTATION} variables={{ title, text }}>
          {(createDraft, { loading, error }) => (
            <Form>
              <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={async e => {
                  e.preventDefault()
                  const res = await createDraft()
                  console.log(res)
                  this.setState({
                    visible: false,
                  })
                }}
                onCancel={this.handleCancel}
              >
                <Input
                  placeholder="Please add title"
                  onChange={e => this.setState({ title: e.target.value })}
                />
                <br />
                <TextArea
                  rows={4}
                  placeholder="Please add content"
                  onChange={e => this.setState({ text: e.target.value })}
                />
              </Modal>
            </Form>
          )}
        </Mutation>
      </Fragment>
    )
  }
}

export default CreatePost

const DRAFT_MUTATION = gql`
  mutation DRAFT_MUTATION($title: String!, $text: String!) {
    createDraft(title: $title, text: $text) {
      id
      createdAt
      title
      text
    }
  }
`

// const PUBLISH_MUTATION = gql`
//   mutation PUBLISH_MUTATION($title: String!, $text: String!) {
//     publish(title: $title, text: $text) {
//       id
//       # createdAt
//       title
//       text
//     }
//   }
// `
