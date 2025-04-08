export default function QuestionNavigator({ values, action, position }) {
  return (
    <div className="mx-auto grid max-w-[260px] grid-cols-2 gap-2 p-2 sm:grid-cols-3 sm:p-4 md:grid-cols-4 lg:min-w-[200px] lg:grid-cols-5">
      {values.map(({ type }, i) => (
        <div
          key={i}
          onClick={() => action(i)}
          className={`relative flex flex-col items-center justify-center rounded-sm border-2 border-solid border-gray-400 ${
            position === i ? 'outline-3 shadow-lg outline outline-gray-800' : 'rounded-sm border-solid border-gray-500'
          } hover:cursor-pointer hover:rounded-md hover:outline hover:outline-2 hover:outline-gray-500`}
        >
          {(type === 'flagged' || type === 'answered-flagged') && (
            <div className="absolute right-0 top-[-0.5px] flex h-[14px] w-[14px] items-center justify-center">
              <svg className="h-full w-full" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,-4 L16,12" stroke="red" strokeWidth="5" />
              </svg>
            </div>
          )}
          <span className="text-sm hover:cursor-pointer">{i + 1}</span>
          <div
            className={`rounded-b-xsm h-3 w-full border-t-black ${
              type === 'answered' || type === 'answered-flagged' ? 'bg-green-500' : 'bg-gray-400'
            }`}
          />
        </div>
      ))}
    </div>
  )
}
