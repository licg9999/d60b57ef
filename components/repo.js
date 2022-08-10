import { useState } from 'react'
import { useSpreadIn, useSpreadOut } from 'spreado'
import { useSwrFallbackData } from 'spreado/for-redux-swr'
import useSWR from 'swr'

export const INDEX_OF_REPO_SWR = 'INDEX_OF_REPO_SWR'

export function useRepoSwrSpreadOut(repoName) {
  return useSpreadOut(
    INDEX_OF_REPO_SWR,
    useSWR([INDEX_OF_REPO_SWR, repoName], () => fetchRepoInfo(repoName), {
      fallbackData: useSwrFallbackData(INDEX_OF_REPO_SWR),
    })
  )
}

export function useRepoSwrSpreadIn() {
  return useSpreadIn(INDEX_OF_REPO_SWR, {})
}

export async function fetchRepoInfo(repoName) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: repoName,
        description: `Mocked description ${Math.random()}`,
        subscribers_count: Math.round(1000 + 9000 * Math.random()),
        stargazers_count: Math.round(1000 + 9000 * Math.random()),
        forks_count: Math.round(1000 + 9000 * Math.random()),
      })
    }, 1000 + Math.random() * 1000)
  })
}

export const DEFAULT_REPO_NAME = 'reduxjs/redux'

function Repo() {
  const [repoName, setRepoName] = useState(DEFAULT_REPO_NAME)
  const { data } = useRepoSwrSpreadOut(repoName)
  const isLoading = !data

  return (
    <div>
      <div>
        <label>Please select a repo: </label>
        <select value={repoName} onChange={(e) => setRepoName(e.target.value)}>
          <option>reduxjs/redux</option>
          <option>vercel/swr</option>
          <option>react-easier/spreado</option>
        </select>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <p>Name: {data.name}</p>
          <p>Description: {data.description}</p>
          <p>
            Numbers:
            <span>👀 {data.subscribers_count}</span>
            <span>✨ {data.stargazers_count}</span>
            <span>🍴 {data.forks_count}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default Repo
