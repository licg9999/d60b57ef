import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  createSpreadoReduxPreloadedState,
  renderSwrResponse,
} from 'spreado/for-redux-swr'
import { startClock } from '../actions'
import Examples from '../components/examples'
import Repo, {
  INDEX_OF_REPO_SWR,
  fetchRepoInfo,
  DEFAULT_REPO_NAME,
} from '../components/repo'
import ShareRepo from '../components/share-repo'

const Index = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startClock())
  }, [dispatch])

  return (
    <>
      <Examples />
      <Link href="/show-redux-state">
        <a>Click to see current Redux State</a>
      </Link>
      <hr />
      <Repo />
      <ShareRepo />
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      initialReduxState: createSpreadoReduxPreloadedState({
        [INDEX_OF_REPO_SWR]: renderSwrResponse(
          await fetchRepoInfo(DEFAULT_REPO_NAME)
        ),
      }),
    },
  }
}

export default Index
