import PropTypes from 'prop-types'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLang } from './useLang'
import getUpdateData from '../services/getUpdateData'
import { useLocalStorage } from '../hooks/use-local-storage'

const AppContext = createContext({})

export const TagAppContext = ({ children, hashKey }) => {
  const language = useLang()
  const [updateData, setUpdateData] = useState(null)
  const [formSettings, setFormSettings] = useLocalStorage('myApp:form', {
    url: 'https://sdk-os-static.mihoyo.com/hk4e_global/mdk/launcher/api/resource?launcher_id=10&key=gcStgarh',
    predl: true
  })
  useEffect(() => {
    (async () => {
      const temp = await getUpdateData(formSettings.url, formSettings.predl)
      setUpdateData(temp)
    })()
  }, [setUpdateData])
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <AppContext.Provider
      value={{
        myLang: language,
        myDataApi: updateData,
        myForm: { formSettings, setFormSettings },
        myModal: { show, handleClose, handleShow }
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
TagAppContext.propTypes = {
  children: PropTypes.node.isRequired,
  hashKey: PropTypes.number
}
TagAppContext.defaultProps = {
  hashKey: null
}
export const useAppContext = () => useContext(AppContext)
