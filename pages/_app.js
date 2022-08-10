import { useMemo } from 'react'
import { Provider } from 'react-redux'
import { SpreadoSetupProvider } from 'spreado'
import { SpreadoSetupForReduxSwr } from 'spreado/for-redux-swr'
import { useStore } from '../store'

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  const spreadoSetup = useMemo(() => {
    return new SpreadoSetupForReduxSwr({ store })
  }, [store])

  return (
    <Provider store={store}>
      <SpreadoSetupProvider setup={spreadoSetup}>
        <Component {...pageProps} />
      </SpreadoSetupProvider>
    </Provider>
  )
}
