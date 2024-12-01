import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserOrHomeRouter from './pages/UserOrHomeRouter'
import AuthProvider from './handles/AuthProvider'
import ErrorPage from './pages/ErrorPage'
import Movies from './components/HomePageComp/Movies'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import loadingAnimation from '../src/assets/loadingAnimation.gif';
import MovieDetailsPage from './pages/MovieDetailsPage'
import AdminAuthProvider from './handles/AdminAuthProvider'
import AdminRoutePage from './pages/AdminRoutePage'
import AddMovies from './components/AdminPageComp/AddMovies'
import DetailsPage from './components/AdminPageComp/DetailsPage'
import RemoveMovies from './components/AdminPageComp/RemoveMovies'

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserOrHomeRouter />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Movies />
      },
      {
        path: ':key',
        element: <Movies />
      }
    ]
  },
  {
    path: 'movie/:movie_id',
    element: <MovieDetailsPage />,
    errorElement: <ErrorPage />
  },
  {
    path: 'admin',
    element: <AdminRoutePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <AddMovies />
      },
      {
        path: 'details',
        element: <DetailsPage />
      },
      {
        path: 'removeMovies',
        element: <RemoveMovies />
      }
    ]
  }
])


const App = () => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const handleLoad = () => {
      setLoading(false);
    }

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    }

  }, []);


  return (
    <>
      {loading ? (
        <div className='h-screen w-screen flex justify-center items-center bg-black'>
          <img src={loadingAnimation} alt="loadingAnimation" />
        </div>
      ): (
        <AdminAuthProvider>
          <AuthProvider>
            <ToastContainer limit={5} position='top-left' />
            <RouterProvider router={router} />
          </AuthProvider>
        </AdminAuthProvider>
      )}
    </>
  )
}

export default App
