import { useState } from 'react'
import PixelOverlay from './components/PixelOverlay'
import LoadingScreen from './components/LoadingScreen'
import ProjectRollerScreen from './components/ProjectRollerScreen'
import RefinementScreen from './components/RefinementScreen'
import PrivacyModal from './components/PrivacyModal'
import './App.scss'

function App() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [showProjectRollerScreen, setShowProjectRollerScreen] = useState(false)
  const [showRefinementScreen, setShowRefinementScreen] = useState(false)
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false)

  const onLoadingScreenFinish = () => {
    setShowLoadingScreen(false)
    setShowProjectRollerScreen(true)
  }

  const onProjectSelectFinish = () => {
    setShowProjectRollerScreen(false)
    setShowRefinementScreen(true)
  }

  return (
    <>
      <PixelOverlay />
      { showLoadingScreen && <LoadingScreen onFinish={onLoadingScreenFinish} /> }
      { showProjectRollerScreen && <ProjectRollerScreen onFinish={onProjectSelectFinish} /> }
      { showRefinementScreen && <RefinementScreen /> }
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => {setPrivacyModalOpen(false)}}
      />
      <div className="app__info app__info--privacy">
        <a href="#" onClick={() => {setPrivacyModalOpen(true)}}>Privacy</a>
      </div>
      <div className="app__info app__info--about">
        Made by <a href="https://michal.dev" target="_blank">Michal</a>
      </div>
    </>
  )
}

export default App
