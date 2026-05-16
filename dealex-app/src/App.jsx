import { useEffect } from 'react'
import Landing from './components/Landing.jsx'
import AppShell from './components/AppShell.jsx'
import AuthSheet from './components/AuthSheet.jsx'
import DocViewer from './components/DocViewer.jsx'

export default function App() {
  useEffect(() => {
    // Initialize signature canvas after DOM is ready
    const initCanvas = () => {
      if (typeof window.initSigCanvas === 'function') {
        window.initSigCanvas()
      }
    }
    const timer = setTimeout(initCanvas, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Landing />
      <AuthSheet />
      <AppShell />
      <DocViewer />
    </>
  )
}
