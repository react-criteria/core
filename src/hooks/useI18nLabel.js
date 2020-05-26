import React from 'react'
import i18nContext from '../I18nContext'

export default function useI18nLabel (i18nPath, ...args) {
  const i18n = React.useContext(i18nContext)

  return React.useMemo(() => {
    const i18nValue = i18n[i18nPath]

    return typeof i18nValue !== 'function'
      ? i18nValue
      : i18nValue(...args)
  }, [i18n, i18nPath, args])
}
