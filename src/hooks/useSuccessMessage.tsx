import { useState, useCallback } from 'react'

function useSuccessMessage(duration: number = 1000) {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const triggerSuccessMessage = useCallback((callback: () => void) => {
        callback()
        setShowSuccessMessage(true)
        setTimeout(() => {
            setShowSuccessMessage(false)
        }, duration)
    }, [duration])

    return { showSuccessMessage, triggerSuccessMessage }
}

export default useSuccessMessage