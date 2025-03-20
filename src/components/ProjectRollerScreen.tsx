import { useState, useEffect } from 'react'
import './ProjectRollerScreen.scss'

type ProjectSelectProps = {
  onFinish: () => void;
}

export default function ProjectSelect({onFinish}: ProjectSelectProps) {
  const [rollerPositions, setRollerPositions] = useState<number[]>(() => Array.from({ length: 11 }, (_, index) => index))
  const [files, setFiles] = useState<{name: string, position: number }[]>([
    { name: '', position: 0 },
    { name: 'D', position: 0 },
    { name: '', position: 0 },
    { name: 'Cold Harbor', position: 0 },
    { name: 'Culpepper', position: 0 },
    { name: 'C', position: 0 },
    { name: 'Bone Alley', position: 0 },
    { name: 'Bellingham ', position: 0 },
    { name: 'Banana Peak', position: 0 },
    { name: 'B', position: 0 },
    { name: 'Amarena Flvr', position: 0 },
    { name: 'Animal Coast', position: 0 },
    { name: 'Alpine White', position: 1 },
    { name: 'Alice Hat', position: 2 },
    { name: 'A', position: 3 },
    { name: '', position: 4 },
    { name: '', position: 5 },
    { name: '', position: 6 },
  ])
  const [intervalTime, setIntervalTime] = useState(100);
  const [hide, setHide] = useState(false);

  const moveRollerPositions = () => {
    setRollerPositions(prevPositions => {
      const [first, ...rest] = prevPositions;
      return [...rest, first];
    });
  };

  const moveFiles = () => {
    setFiles(prevFiles => {
      const newFiles = prevFiles.map((file, index) => ({
        ...file,
        position: prevFiles[index + 1]?.position || 0
      }))

      return newFiles
    });
  }

  useEffect(() => {
    let internalIntervalTime = intervalTime
    let timeoutId: number | null = null;
    let finishTimeoutId: number | null = null;
    let count = 0

    const animate = () => {
      moveRollerPositions();
      if (count % 2 === 0) {
        moveFiles();
      }
      count += 1

      if (count >= 20) {
        setHide(true)

        finishTimeoutId = setTimeout(() => {
          onFinish()
        }, 2000)

        return
      }

      internalIntervalTime += 10 * Math.sin((Math.PI / 2) * (count / 20));
      setIntervalTime(internalIntervalTime);
      timeoutId = window.setTimeout(animate, internalIntervalTime);
    }

    animate();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (finishTimeoutId) {
        clearTimeout(finishTimeoutId);
      }
    };
  }, []);

  return (
    <div className={`project-roller-screen ${hide ? 'project-roller-screen--hide' : ''}`}>
      <div className="project-roller-screen__roller">
        {rollerPositions.map((position, index) => (
          <div
            key={index}
            className={`project-roller-screen__roller-item project-roller-screen__roller-item--position_${position}`}
            style={{ transitionDuration: `${intervalTime + 50}ms` }}
          />
        ))}
      </div>
      <div className="project-roller-screen__files">
        {files.map((file, index) => (
          <div
            key={index}
            className={`project-roller-screen__file project-roller-screen__file--position_${file.position}`}
            style={{ transitionDuration: `${2 * intervalTime + 50}ms` }}
          >
            <div className="project-roller-screen__file-inner">
              <span
                style={{ transitionDuration: `${(intervalTime + 50) / 2}ms` }}
                className={file.name.length == 1 ? 'project-roller-screen__file-letter project-roller-screen__file-letter--' + file.name.toLowerCase() : 'project-roller-screen__file-name'}
              >
                <span>{file.name}</span>
              </span>
            </div>
          </div>
        ))}
        <div className="project-roller-screen__file-bottom project-roller-screen__file-bottom--up" />
        <div className="project-roller-screen__file-bottom project-roller-screen__file-bottom--down" />
        <div className="project-roller-screen__file-join project-roller-screen__file-join--left" />
        <div className="project-roller-screen__file-join project-roller-screen__file-join--right" />
      </div>
      <div className="project-roller-screen__roller">
        {rollerPositions.map((position, index) => (
          <div
            key={index}
            className={`project-roller-screen__roller-item project-roller-screen__roller-item--position_${position}`}
            style={{ transitionDuration: `${intervalTime + 50}ms` }}
          />
        ))}
      </div>
    </div>
  )
}