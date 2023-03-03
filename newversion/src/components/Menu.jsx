import React, { useEffect } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Container, Button } from 'react-bootstrap'
import { useTitle } from 'react-use'
import { useCurrentPath } from '../hooks/use-current-path'
import { useRouter } from '../hooks/use-router'
import { appPages } from '../pages/urls'
import { useAppContext } from '../context/AppContext'
import { TagVerticallyCenteredModal } from './TagVerticallyCenteredModal'

const Menu = () => {
  const { myDataApi: { updateData }, myModal: { show, handleClose, handleShow } } = useAppContext()

  const { location, push } = useRouter()
  const temp = appPages.find(
    ({ url, title }) => useCurrentPath(url, location) && { title }
  )
  useTitle(`HY-verse-dl | ${temp?.title}`)
  useEffect(() => {
    !temp && push('/')
  }, [temp])
  /* const TagListMenu = () => {
    return appPages.map(({ url, title }, index) => {
      return (
        !url.includes(':') && (
          <Nav.Link active={pathname === url} key={index} href={'#' + url}>
            <span className="h5">{title}</span>
          </Nav.Link>
        )
      )
    })
  } */

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect={true}>
      <Container>
        <Navbar.Brand href="#/">HY-verse-dl</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          {/* <Nav>
            <TagListMenu />
          </Nav> */}
          <Nav>
            <Nav.Link>
              Latest version: <strong>{updateData?.data?.latest?.version}</strong>
            </Nav.Link>
          </Nav>
          <Button
            variant="outline-secondary"
            onClick={handleShow}
          >
            <span className="icon is-small">
              <i className="fas fa-cog"></i>
            </span>
          </Button>
        </Navbar.Collapse>
        <TagVerticallyCenteredModal
          show={show} onHide={handleClose}
        />
        <pre></pre>
      </Container>
    </Navbar>
  )
}

export default Menu
