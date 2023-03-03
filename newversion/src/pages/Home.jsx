import React, { useEffect, useState, useRef } from 'react'

import { Col, Container, ProgressBar, Row } from 'react-bootstrap'

const Home = () => {
  const [progress, setProgress] = useState(0)
  const progressRef = useRef()
  useEffect(() => {
    progressRef.current && window.clearInterval(progressRef.current)
    progressRef.current = window.setInterval(() => {
      progress <= 100 && setProgress(progress + 0.05)
      progress >= 100 && window.clearInterval(progressRef.current)
    }, 10)
  }, [progress])
  return (
    <Container fluid>
      <Row>
        <Col className='text-center'>
        <p className='h3'>Fetching data...</p>
        <Row className='justify-content-center'>
          <Col lg={4}>
          <ProgressBar animated now={progress} label={`${Math.floor(progress)}%`}/>
          </Col>
        </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
