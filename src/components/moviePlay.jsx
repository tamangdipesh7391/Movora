import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { movieApi } from "../api";
import { useNavigate } from "react-router-dom";

export function MoviePlay() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    const navigate = useNavigate();
    const backTimeoutRef = useRef(null);

    useEffect(() => {
        return () => clearTimeout(backTimeoutRef.current);
    }, []);

    const handleBack = () => {
        if (isExiting) return;
        setIsExiting(true);
        backTimeoutRef.current = setTimeout(() => {
            navigate(-1);
        }, 500);
    };

    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await movieApi.get(`/movie/${id}/videos`);

                const trailer = response.data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
                setMovie(trailer);
            } catch (error) {
                console.error("Error fetching movie:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMovie();
    }, []);

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center text-white">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="relative h-full flex items-center justify-center text-white">
            <button
                onClick={handleBack}
                disabled={isExiting}
                aria-label="Back to Movie Details"
                title="Back to Movie Details"
                className={`absolute top-20 right-4 z-100 text-white bg-gradient-to-r from-[#a855f7] to-[#8b5cf6] hover:from-[#9333ea] hover:to-[#7c3aed] font-bold p-2 rounded-full transform shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] ${isExiting
                        ? "transition-all duration-1000 ease-in-out -translate-x-[120vw] opacity-0 pointer-events-none"
                        : "transition-all duration-300 hover:scale-105"
                    }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 transition-transform duration-1000 ease-in-out ${isExiting ? "scale-[2.5]" : "scale-100"}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                </svg>
            </button>
            {movie ? (
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${movie.key}`}
                    title={movie.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                <h1>No trailer available</h1>
            )}
        </div>
    )
}
