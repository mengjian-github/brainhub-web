import { useState, useEffect } from "react";

const steps = ["问题分析", "全网搜索", "整理结果", "结束"];

export default function SearchProgress() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prevStep) =>
        prevStep < steps.length - 1 ? prevStep + 1 : prevStep
      );
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto mt-8">
      <div className="flex justify-between mb-2 relative">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center relative z-10">
            <div
              className={`w-6 h-6 rounded-full border-2 ${
                index <= currentStep
                  ? "border-blue-600 bg-white"
                  : "border-gray-300 bg-white"
              }`}
            ></div>
            <div
              className={`text-xs mt-2 ${
                index <= currentStep ? "text-blue-600" : "text-gray-400"
              }`}
            >
              {step}
            </div>
          </div>
        ))}
        <div className="absolute top-3 left-3 right-3 h-0.5 bg-gray-200"></div>
        <div
          className="absolute top-3 left-3 h-0.5 bg-blue-600 transition-all duration-500 ease-out"
          style={{
            width: `calc(${(currentStep / (steps.length - 1)) * 100}% - 12px)`,
          }}
        ></div>
      </div>
    </div>
  );
}
