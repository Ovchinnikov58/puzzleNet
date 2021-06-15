import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LinearProgress from '@material-ui/core/LinearProgress'
import Masonry from 'react-masonry-css'

import { fetchPosts, changeLoadValue } from '../../store/actions'
import { RootState, AppState, PostsState } from '../../utils/types'
import './home.scss'

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
}

const Home: FC = (): JSX.Element => {
  const { loading } = useSelector((s: RootState): AppState => s.app)
  const { fetchedPosts, loadValue, dist } = useSelector((s: RootState): PostsState => s.posts)
  const dsp = useDispatch()

  useEffect(() => getPosts(loadValue), [loadValue])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  })

  return (
    <div className="home">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {fetchedPosts.map((post) =>
          post?.url.includes('.jpg') ? (
            <div key={post?.id} className="post">
              <img src={post.url} alt={post?.title} />
            </div>
          ) : null,
        )}
      </Masonry>
      {loadValue - dist > 10 && fetchedPosts.length ? <p className="home__info_no-content">Пока всё!</p> : ''}
      {loading ? <LinearProgress /> : ''}
    </div>
  )

  function handleScroll() {
    const el = document.querySelector('HTML')
    if (el && el.scrollHeight - (el.scrollTop + window.innerHeight) < 1) {
      if (!loading && !(loadValue - dist > 10)) {
        dsp(changeLoadValue())
      }
    }
  }

  function getPosts(n: number) {
    dsp(fetchPosts(n))
  }
}

export default Home
