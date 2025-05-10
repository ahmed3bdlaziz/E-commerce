import { useState, useEffect } from 'react'
import 'animate.css'

const LoadingScreen = ({ onFinished }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [loadingText, setLoadingText] = useState('Preparing your experience...')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.floor(Math.random() * 8) + 2

        // Update loading text based on progress
        if (newProgress > 30 && newProgress <= 60) {
          setLoadingText('Loading products...')
        } else if (newProgress > 60 && newProgress <= 90) {
          setLoadingText('Almost there...')
        } else if (newProgress > 90) {
          setLoadingText('Ready to shop!')
        }

        return newProgress > 100 ? 100 : newProgress
      })
    }, 150)

    // Complete loading after progress reaches 100%
    const timer = setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      setLoadingText('Ready to shop!')

      // Add a small delay before hiding the loading screen
      setTimeout(() => {
        setIsVisible(false)
        if (onFinished) onFinished()
      }, 800)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [onFinished])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-base-100 flex flex-col items-center justify-center z-50">
      <div className="w-full max-w-md px-8 animate__animated animate__fadeIn">
        {/* Logo Animation */}
        <div className="flex justify-center mb-12">
          <div className="animate__animated animate__bounceIn">
            {/* Replace with your logo or icon */}
            <div className="text-6xl font-bold text-primary">Shopify.co</div>
          </div>
        </div>

        {/* DaisyUI Progress Bar */}
        <div className="mb-6">
          <progress
            className="progress progress-primary w-full"
            value={progress}
            max="100"
          ></progress>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-sm text-base-content mb-2 animate__animated animate__pulse animate__infinite">
            {loadingText}
          </p>
          <p className="text-xs text-base-content opacity-60">{progress}%</p>
        </div>

        {/* DaisyUI Loading Spinner */}
        <div className="flex justify-center mt-8">
          <span className="loading loading-spinner loading-md text-primary"></span>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
