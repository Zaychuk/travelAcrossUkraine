import { RefObject, useEffect } from 'react'

export function useOnClickOutside(ref: RefObject<HTMLElement>, handler: (isClickOut: boolean) => void) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listener = (event: any) => {
      handler(!(ref.current && ref.current.contains(event.target)))
    }

    document.addEventListener('mousedown', listener, true)
    document.addEventListener('touchstart', listener, true)

    return () => {
      document.removeEventListener('mousedown', listener, true)
      document.removeEventListener('touchstart', listener, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
}
