import React from "react"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function ProgressBar({ currentStep, totalSteps, className = "" }: ProgressBarProps) {
  const progressPercentage = Math.min((currentStep / totalSteps) * 100, 100)

  return (
    <div
      className={`w-full bg-black rounded-full h-2 ${className}`}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Step ${currentStep} of ${totalSteps}`}
    >
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${progressPercentage}%`,
          backgroundColor: "#71c66b",
        }}
      />
    </div>
  )
}
