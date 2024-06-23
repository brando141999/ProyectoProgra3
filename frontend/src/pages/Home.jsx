import { useState, useEffect } from "react";
import { get_movies_recommendations_tag } from "../api/api.js";

const Home = () => {
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [showFullSynopsis, setShowFullSynopsis] = useState({});

    useEffect(() => {
        const fetchRecommendedMovies = async () => {
            try {
                const movies = await get_movies_recommendations_tag();
                setRecommendedMovies(movies);
            } catch (error) {
                console.error(error);
            }
        }

        fetchRecommendedMovies();
    }, []);

    const toggleSynopsis = (index) => {
        setShowFullSynopsis(prevState => ({...prevState, [index]: !prevState[index]}));
    }

    return (
        <div className="flex flex-col items-start mt-16 ml-2">
            <h1 className="text-3xl mb-4">Recomendacion por tags</h1>
            {recommendedMovies.map((movie, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg p-4 mb-4  w-11/12 ">
                    <h2 className="text-2xl mb-2">{movie.title}</h2>
                    <div className="flex flex-wrap mb-2">
                        {movie.tags.split(',').map((tag, i) => (
                            <span key={i}
                                  className="tag bg-blue-200 text-blue-700 rounded px-2 py-1 mr-2 mb-2">{tag.trim()}</span>
                        ))}
                    </div>
                    <p className="text-sm">
                        {showFullSynopsis[index] ? movie.synopsis : `${movie.synopsis.substring(0, 300)}...`}
                        <button onClick={() => toggleSynopsis(index)} className="text-blue-500 ml-2">
                            {showFullSynopsis[index] ? 'Ver menos' : 'Ver más'}
                        </button>
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Home;