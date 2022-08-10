import { useRepoSwrSpreadIn } from './repo'

function ShareRepo() {
  const { data } = useRepoSwrSpreadIn()
  const isLoading = !data
  return (
    <div>
      {isLoading ? (
        <div>Loading in another format...</div>
      ) : (
        <p>
          Numbers in another format:
          <span>👁 {data.subscribers_count}</span>
          <span>⭐️ {data.stargazers_count}</span>
          <span>⑂ {data.forks_count}</span>
        </p>
      )}
    </div>
  )
}

export default ShareRepo
