import { useState, useEffect } from 'react'
import LumonLogo from '../assets/LumonLogo.svg?react';
import './ScreenSaver.scss'

export default function ScreenSaver(props: {isShown: boolean}) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (props.isShown) {
      setShow(true)
    }
  }, [props.isShown])

  return (
    <>
      {show && (
        <div className="screen-saver">
          <LumonLogo/>
        </div>
      )}
    </>
  )
}