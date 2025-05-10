import { useState, useEffect } from 'react'
import 'animate.css'

const FancyLoadingScreen = ({ onFinished }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [step, setStep] = useState(1)

  useEffect(() => {
    // Animation sequence
    const step1Timer = setTimeout(() => setStep(2), 1000)
    const step2Timer = setTimeout(() => setStep(3), 2000)
    const step3Timer = setTimeout(() => setStep(4), 3000)

    // Complete loading
    const completeTimer = setTimeout(() => {
      setIsVisible(false)
      if (onFinished) onFinished()
    }, 4000)

    return () => {
      clearTimeout(step1Timer)
      clearTimeout(step2Timer)
      clearTimeout(step3Timer)
      clearTimeout(completeTimer)
    }
  }, [onFinished])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-base-100 flex flex-col items-center justify-center z-50">
      <div className="text-center">
        {/* Step 1: Logo appears */}
        <div
          className={`animate__animated ${step === 1 ? 'animate__zoomIn' : ''}`}
        >
          <div className="text-6xl font-bold text-primary mb-8">CD</div>
        </div>

        {/* Step 2: Tagline appears */}
        {step >= 2 && (
          <div className="animate__animated animate__fadeIn">
            <p className="text-xl mb-8">Your Fashion Destination</p>
          </div>
        )}

        {/* Step 3: Loading indicators */}
        {step >= 3 && (
          <div className="animate__animated animate__fadeIn flex flex-col items-center">
            <div className="flex gap-2 mb-4">
              <span className="loading loading-dots loading-sm text-primary"></span>
            </div>
            <div className="badge badge-primary badge-outline">
              Loading Experience
            </div>
          </div>
        )}

        {/* Step 4: Ready message */}
        {step >= 4 && (
          <div className="animate__animated animate__fadeIn mt-8">
            <div className="alert alert-success w-64 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Ready to shop!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FancyLoadingScreen
