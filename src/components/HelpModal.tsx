import Modal from "./Modal";
import './HelpModal.scss'

type HelpModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal(props: HelpModalProps) {
  return (
    <Modal
      title="How to"
      open={props.isOpen}
      onClose={props.onClose}
    >
      <ol className="help-modal">
        <li>
          Use the <strong>arrow keys</strong> to navigate the refinement screen.
        </li>
        <li>
          Press and hold the <strong>left mouse button</strong> to start selecting numbers. Move the cursor over the numbers while holding the button. Release the button to stop selecting.
        </li>
        <li>
          Press the <strong>Escape key</strong> to cancel the selection.
        </li>
        <li>
          Press a <strong>box number</strong> (1–5) to assign the selected numbers to that box.
        </li>
      </ol>
    </Modal>
  )
}