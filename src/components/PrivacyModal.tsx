import Modal from "./Modal";

type PrivacyModalProps = {
  isOpen: boolean,
  onClose: () => void
}

export default function PrivacyModal(props: PrivacyModalProps) {
  return (
    <Modal
      open={props.isOpen}
      onClose={props.onClose}
      title="Privacy notice"
    >
      <p>This website does not collect, store, or process any personal data, and it does not use cookies. However, since this website is hosted on <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>, the <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank">GitHub Privacy Statement</a> applies. For statistical purposes, <a href="https://www.cloudflare.com/en-gb/web-analytics/" target="_blank">Cloudflare Web Analytics</a> is used.</p>
      <p>Made by <a href="https://michal.dev" target="_blank">Michal</a></p>
    </Modal>
  )
} 