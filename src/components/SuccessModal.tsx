import Modal from './Modal'
import './SuccessModal.scss'

type SuccessModalProps = {
  isOpen: boolean
}

export default function SuccessModal(props: SuccessModalProps) {
  const destroy = () => {
    window.document.body.innerHTML = '<div class="goodbye">Thank you for your commitment. Good bye.</div>'
  }

  return (
    <Modal
      title="Congratulations!"
      open={props.isOpen}
      onClose={destroy}
    >
      <p>You have completed the project. You may now return to your regular duties.</p>
    </Modal>
  )
}