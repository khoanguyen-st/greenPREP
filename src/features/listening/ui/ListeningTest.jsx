import PlayStopButton from './play-stop-button'

const ListeningTest = () => {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="flex space-x-4">
        <PlayStopButton src="https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav" />
        <PlayStopButton src="" />
      </div>
    </div>
  )
}

export default ListeningTest
