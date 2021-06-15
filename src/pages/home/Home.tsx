import React, { FC, useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LinearProgress from '@material-ui/core/LinearProgress'
import Masonry from 'react-masonry-css'
import ImageViewer from 'react-simple-image-viewer'

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
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [images, setImages] = useState([] as Array<string> | Array<never>)

  const { loading } = useSelector((s: RootState): AppState => s.app)
  const { fetchedPosts, loadValue, dist } = useSelector((s: RootState): PostsState => s.posts)
  const dsp = useDispatch()

  const openImageViewer = useCallback((src) => {
    setImages([src])
    setIsViewerOpen(true)
  }, [])

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
              <button type="button" onClick={() => openImageViewer(post.url)}>
                <img src={post.url} alt={post?.title} />
              </button>
            </div>
          ) : null,
        )}
      </Masonry>
      {isViewerOpen && <ImageViewer src={images} onClose={closeImageViewer} />}
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

  function closeImageViewer() {
    setImages([])
    setIsViewerOpen(false)
  }

  function getPosts(n: number) {
    dsp(fetchPosts(n))
  }
}

export default Home
