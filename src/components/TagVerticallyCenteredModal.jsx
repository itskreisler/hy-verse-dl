import React from 'react'
import { Modal, Form, InputGroup, Button } from 'react-bootstrap'
import { useAppContext } from '../context/AppContext'
import { useHookForm } from '../hooks/use-hook-form'

const TagVerticallyCenteredModal = (props) => {
  const { myModal: { show, handleClose }, myForm: { formSettings, setFormSettings } } = useAppContext()
  const { register, handleSubmit } = useHookForm(formSettings)
  const onSubmit = (data) => {
    console.log(data)
    setFormSettings(data)
  }
  return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered show={show} onHide={handleClose}
      >
        <Modal.Header className="bg-dark" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formSetting.url">
              <Form.Label>Update data URL</Form.Label>
              <InputGroup className="mb-3">
              <InputGroup.Text className="bg-dark text-light">
                <span>
                  <i className="fa fa-link"></i>
                </span>
              </InputGroup.Text>
              <Form.Control
                type="url"
                autoFocus
                className="bg-dark text-light"
                placeholder="https://sdk-..."
              />
              <InputGroup.Text className="bg-dark text-danger">
                <span>
                  <i className="fa fa-exclamation-triangle"></i>
                </span>
              </InputGroup.Text>
            </InputGroup>
            </Form.Group>
            <Form.Check {...register('predl')} {...{
              value: formSettings?.predl
            }}
            type={'checkbox'}
            id={'default-switch'}
            label={'Show pre-downloads, if available'}
          />
          <hr />
          <Button type='submit' variant="success" onClick={handleClose}>
            Save
          </Button>
          </Form>
        </Modal.Body>
      </Modal>
  )
}
export { TagVerticallyCenteredModal }
