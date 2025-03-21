export default function QuestionNavigatior({ values, action }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2 sm:p-4 max-w-[260px] lg:min-w-[200px] mx-auto">
      {values.map(({ type }, i) => (
        <div
          key={i}
          onClick={() => action(i)}
          className="relative flex flex-col items-center justify-center rounded-sm border-2 border-gray-500 border-solid"
        >
          {(type === "flagged" || type === "answered-flagged") && (
            <div className="absolute top-[-0.5px] right-0 w-[14px] h-[14px]">
              <svg
                className="w-full h-full"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0,-4 L16,12" stroke="red" strokeWidth="5" />
              </svg>
            </div>
          )}
          <span className="text-sm">{i + 1}</span>
          <div
            className={`w-full h-3 border-t-black rounded-b-xsm ${
              type === "answered" || type === "answered-flagged"
                ? "bg-green-500"
                : "bg-gray-400"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
