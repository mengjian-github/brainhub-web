const steps = ["问题分析", "全网搜索", "整理结果", "结束"];

export default function SearchProgress({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className="w-full mx-auto px-4 py-4 bg-gray-50">
      <div className="flex justify-between mb-2 relative">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center relative z-10">
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                index <= currentStep
                  ? "border-blue-600 bg-white"
                  : "border-gray-300 bg-white"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  index <= currentStep ? "bg-blue-600" : "bg-white"
                }`}
              ></div>
            </div>
            <div
              className={`text-xs mt-1 ${
                index <= currentStep ? "text-blue-600" : "text-gray-400"
              }`}
            >
              {step}
            </div>
          </div>
        ))}
        <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-200"></div>
        <div
          className="absolute top-3 left-0 h-0.5 bg-blue-600 transition-all duration-500 ease-out"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
