import { useLayoutEffect, useState } from 'react'

const cachedScripts: string[] = []

export const useScript = (id: string, src: string) => {
  // Keeping track of script loaded and error state
  const [state, setState] = useState({
    loaded: false,
    error: false
  })

  // eslint-disable-next-line consistent-return
  useLayoutEffect(() => {
    // Create script
    const fjs = document.getElementsByTagName('script')[0]
    const script = document.createElement('script')

    // Script event listener callbacks for load and error
    const onScriptLoad = () => {
      setState({
        loaded: true,
        error: false
      })
    }

    const onScriptError = () => {
      // Remove from cachedScripts we can try loading again
      const i = cachedScripts.indexOf(src)
      if (i >= 0) cachedScripts.splice(i, 1)
      script.remove()

      setState({
        loaded: true,
        error: true
      })
    }

    if (cachedScripts.includes(src)) {
      setState({
        loaded: true,
        error: false
      })
    } else {
      cachedScripts.push(src)
      script.src = src
      script.id = id
      script.async = true
      fjs?.parentNode?.insertBefore(script, fjs)

      script.addEventListener('load', onScriptLoad)
      script.addEventListener('error', onScriptError)

      // Add script to document body
      document.body.appendChild(script)
    }
    // Remove event listeners on cleanup
    return () => {
      script.removeEventListener('load', onScriptLoad)
      script.removeEventListener('error', onScriptError)
    }
  }, [src, id])

  return [state.loaded, state.error]
}