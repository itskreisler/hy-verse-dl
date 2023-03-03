import React, { useState, useEffect } from 'react'

import { Modal, Alert, Form, InputGroup, Button } from 'react-bootstrap'
import { useAppContext } from '../context/AppContext'
import { useHookForm } from '../hooks/use-hook-form'
import getUpdateData from '../services/getUpdateData'

const TagVerticallyCenteredModal = (props) => {
  const [ifSend, setIfSend] = useState(false)
  const { myDataApi, myModal: { show, handleClose }, myForm: { formSettings, setFormSettings } } = useAppContext()
  const { register, handleSubmit, watch } = useHookForm({ defaultValues: formSettings })
  useEffect(() => {
    console.log(myDataApi?.updateData)
    myDataApi?.updateData?.success === false && setIfSend(!myDataApi?.updateData?.success)
  }, [myDataApi?.updateData])
  const onSubmit = (data) => {
    setIfSend(false)
    setFormSettings(data);
    (async () => {
      const temp = await getUpdateData(watch('url'), formSettings.predl)
      myDataApi.setUpdateData(temp)
    })()
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
        <Alert className="mt-3" show={ifSend} variant={'danger'}>
          {myDataApi?.updateData?.success === false && myDataApi?.updateData?.data}
        </Alert>
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
                type={'url'}
                {...register('url')}
                autoFocus
                className="bg-dark text-light"
                placeholder="https://sdk-..."
                autoComplete='off'
              />
              <InputGroup.Text className="bg-dark text-danger">
                <span>
                  <i className={ifSend ? 'fa fa-exclamation-triangle' : 'fa fa-check'}></i>
                </span>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Check {...register('predl')}
            type={'checkbox'}
            id={'default-switch'}
            label={'Show pre-downloads, if available'}
          />
          <hr />
          <Button type='submit' variant="success">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
export { TagVerticallyCenteredModal }
