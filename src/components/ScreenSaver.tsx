import { useState, useEffect } from 'react'
import './ScreenSaver.scss'

export default function ScreenSaver() {
  const [show, setShow] = useState(false)
  

  useEffect(() => {
    let idleTimer: number | null = null
    const setIdleTimer = () => {
      idleTimer = setTimeout(() => {
        setShow(true)
      }, 30000)
    }

    const clearIdleTimer = () => {
      if (idleTimer) {
        clearTimeout(idleTimer)
        idleTimer = null
      }
    }

    const handleInteraction = () => {
      setShow(false)
      clearIdleTimer()
      setIdleTimer()
    }

    window.addEventListener('keydown', handleInteraction)
    window.addEventListener('mousemove', handleInteraction)
    setIdleTimer()

    return () => {
      window.removeEventListener('keydown', handleInteraction)
      window.removeEventListener('mousemove', handleInteraction)
      clearIdleTimer()
    }
  }, [])

  return (
    <>
      {show && (
        <div className="screen-saver">
          <img className="screen-saver__logo" src="/lumon-logo.svg" />
        </div>
      )}
    </>
  )
}