import { useState, useEffect } from 'react'
import LumonLogo from '../assets/LumonLogo.svg?react';
import './ScreenSaver.scss'

export default function ScreenSaver() {
  const [show, setShow] = useState(true)

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