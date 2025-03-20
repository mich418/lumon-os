import './RefinementHeader.scss';
import LumonLogo from '../assets/LumonLogo.svg?react';
import TotalProgress from './TotalProgress';

type RefinementHeaderProps = {
  totalProgress: number
}

export default function RefinementHeader(props: RefinementHeaderProps) {
  return (
    <header className="refinement-header">
      <div className="refinement-header__main-progress">
        <TotalProgress progress={props.totalProgress} />
        <span className="refinement-header__project-name">Cold Harbor</span>
        <LumonLogo />
      </div>
    </header>
)
}