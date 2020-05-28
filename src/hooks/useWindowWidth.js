import React from 'react'

export default function useWindowWidth () {
  const [width, setWidth] = React.useState(window.innerWidth)

  React.useEffect(() => {
    const listener = () => setWidth(window.innerWidth)
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [])

  return width
}
