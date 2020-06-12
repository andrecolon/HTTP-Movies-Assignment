import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    title: "",
    director: "",
    metascore: "",
    stars: "",
};

const UpdateMovie = props => {
    //set the state with the initial values for our form
    const [movie, setMovie] = useState(initialMovie);
    // look for the id of the movie we clicked on
    const { id } = useParams();
    console.log(props.movie)
    //Loop through this array comparing the id's in the url 
    // try to find the movie we clicked on - take 

    

    // 
    const { push } = useHistory();

useEffect(()=> {
    const movieToUpdate = props.movies.find(
        thing => `${thing.id}` === props.match.params.id
    )
    // I am not gonna call movieToUpdate until 
    // the state is ready so I can use the data - called Race Condition
    if (movieToUpdate){
    setMovie(movieToUpdate)
    //console.log("The Movie will be set to update: ",movieToUpdate)
    }
}, [props.movies, id]);


    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === "name") {
            value = parseInt(value, 10);
        }

        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    };

const handleSubmit = e =>{
    e.preventDefault();
axios
    .put(`http://localhost:5555/movies/${id}`, movie)
    //Grab ID from the params or state , then pass in the movie on state
    .then(res =>{
        //res.data is the full array withthe updated movie
        const newMovie = props.movie.map(mve => {
                    if (mve.id === movie.id) {
                        return movie;
                    }
                    return mve;
                });
                setMovie(newMovie);
                props.history.push('/movies');
    })
    .catch(err =>
                console.error(
                    "UpdateForm.js: handleSubmit: ",
                    err.message,
                    err.response
                )
            );
}
   
    return (
        <div className="form-group">
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={movie.title}
                />
                <div className="baseline" />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={movie.director}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={movie.metascore}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="stars"
                    value={movie.stars}
                />
               

                <button className="md-button form-button">Update</button>
            </form>
        </div>
    );
};

export default UpdateMovie;
