import { useEffect, useState, ReactNode } from "react";
import './Modal.scss'

type ModalProps = {
  open: boolean,
  onClose: () => void,
  title?: string,
  children: ReactNode
}

export default function Modal(props: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (props.open) {
      setIsOpen(true)
      window.addEventListener('keydown', close)

      return () => {
        window.removeEventListener('keydown', close)
      }
    } else {
      setIsOpen(false)
    }
  }, [props.open])

  const close = () => {
    props.onClose()
  }

  return (
    <>
      {isOpen && (
        <div
          className="modal"
        >
          <div className="modal__window">
            <button
              className="modal__close"
              onClick={close}
            />
            {props.title?.trim() && (
              <div className="modal__title">{props.title}</div>
            )}
            <div className="modal__content">
              {props.children}
            </div>
          </div>
        </div>
      )}
    </>
  )
}