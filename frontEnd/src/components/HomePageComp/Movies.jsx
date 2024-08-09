import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { apiKey, movie_api } from '../../handles/apiHandler';
import MovieCards from './MovieCards';
import axios from 'axios';
import { MovieContext } from '../../pages/HomePage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faHome, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';


const Movies = () => {
  
  const navigate = useNavigate();

  //yo chai route parameter ko data
  const data = useParams();

  //movies here
  const [movies, setMovies] = useState([]);

  //context here
  const {contextMovies, setContextMovies} = useContext(MovieContext);



  useEffect(() => {

    try{
      const fetchData = async () => {
        
        if(data.key == undefined){
          data.key = 'popular';
        }
        
        if(data.key === 'popular' || data.key === 'top_rated' || data.key === 'upcoming' ){
          const type = data.key;
          const response = await  movie_api.get(`${type}?language=en-US&page=1&api_key=${apiKey}`);
          setMovies(response.data.results);
          setContextMovies(response.data.results);
        }else{
          const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${data.key}`;
          const response = await axios.get(url);
          setMovies(response.data.results);
          setContextMovies(response.data.results);
        }

      }
      fetchData();
    }catch (error)  {
      console.log(error);
    }
  }, [data, setContextMovies]);

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
  <div className='h-auto w-full flex flex-wrap gap-12 justify-center pt-12'>
    {
     movies.length === 0 ? (
      <div className='h-[60vh] w-full flex justify-center items-center flex-col gap-8 text-6xl'>
        <FontAwesomeIcon icon={faTriangleExclamation} className='text-9xl text-red-500'/>
        <h1 >Sorry, No Movies Found.</h1>
        <div className='flex text-xl h-[10vh] w-full justify-center items-center gap-24'>
          <Link to={'/'} className='flex hover:text-gray-200 justify-center items-center gap-2 cursor-pointer'>
            <FontAwesomeIcon icon={faHome} />
            <h3>Go Back To Home</h3>
          </Link>
          <div onClick={handleGoBack} className='flex hover:text-gray-200 justify-center items-center gap-2 cursor-pointer'>
            <FontAwesomeIcon icon={faBackward} />
            <h3>Go Back</h3>
          </div>
        </div>
      </div>
    ) : (
      <>
        {movies.map(movie => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </>
     )
    }


  </div>
  )
}

export default Movies
