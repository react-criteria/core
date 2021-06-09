import React from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function useID () {
  return React.useMemo(() => uuidv4(), [])
}
