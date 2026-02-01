from fastapi import FastAPI, Body, HTTPException, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Any
from db import get_db, db_execute, row_to_dict
from common import get_all, get_one, create, update_put, update_patch, delete, delete_2
import logging

logging.basicConfig(
    level=logging.ERROR,
    format="%(levelname)s | %(name)s | %(message)s"
)

class Movie(BaseModel):
    title: str
    year: str

app = FastAPI()

app.mount("/static", StaticFiles(directory="../ui/build/static", check_dir=False), name="static")

@app.get("/")
def serve_react_app():
   return FileResponse("../ui/build/index.html")


MOVIE_FIELDS = ["id", "title", "director", "year", "description"]
ACTOR_FIELDS = ["id", "name", "surname"]

@app.get("/movies")
def get_movies(db=Depends(get_db)):
    return get_all(db, "movie", MOVIE_FIELDS, "Movie")

@app.get("/movies/{movie_id}")
def get_movie(movie_id: int, db=Depends(get_db)):
    return get_one(db, "movie", movie_id, MOVIE_FIELDS, "Movie")

@app.post("/movies")
def add_movie(params: dict[str, Any], db=Depends(get_db)):
    movie_id = create(db, "movie", params)
    return {"id": movie_id, "message": "Movie added successfully"}

@app.delete("/movies/{movie_id}")
def remove_movie(movie_id: int, db=Depends(get_db)):
    delete_2(db, "movie_actor_through", 'movie_id', movie_id, "Movie")
    delete(db, "movie", movie_id, "Movie")
    return {"message": "Movie deleted successfully"}

@app.delete("/movies")
def delete_movies_not_allowed():
    raise HTTPException(
        405,
        "Deleting all movies is not allowed"
    )

@app.patch("/movies/{movie_id}")
def update_movie_patch(movie_id: int, params: dict[str, Any], db=Depends(get_db)):
    update_patch(db,"movie", movie_id, params,"Movie", MOVIE_FIELDS)
    return {"message": "Movie updated"}

@app.put("/movies/{movie_id}")
def update_movie_put(movie_id: int, params: dict[str, Any], db=Depends(get_db)):
    update_put(db,"movie", movie_id, params,"Movie", MOVIE_FIELDS)
    return {"message": "Movie replaced"}


@app.get("/actors")
def get_actors(db=Depends(get_db)):
    return get_all(db, "actor", ACTOR_FIELDS, "Actor")

@app.get("/actors/{actor_id}")
def get_actor(actor_id: int, db=Depends(get_db)):
    return get_one(db, "actor", actor_id, ACTOR_FIELDS, "Actor")

@app.post("/actors")
def add_actor(params: dict[str, Any], db=Depends(get_db)):
    actor_id = create(db, "actor", params)
    return {"id": actor_id, "message": "Actor added successfully"}

@app.delete("/actors/{actor_id}")
def remove_actor(actor_id: int, db=Depends(get_db)):
    delete_2(db, "movie_actor_through", 'actor_id', actor_id, "Actor")
    delete(db, "actor", actor_id, "Actor")
    return {"message": "Actor deleted successfully"}

@app.delete("/actors")
def delete_actors_not_allowed():
    raise HTTPException(
        405,
        "Deleting all actors is not allowed"
    )

@app.put("/actors/{actor_id}")
def update_actor_put(actor_id: int, params: dict[str, Any], db=Depends(get_db)):
    update_put(db,"actor",actor_id,params,"Actor",ACTOR_FIELDS)
    return {"message": "Actor replaced"}

@app.patch("/actors/{actor_id}")
def update_actor_patch(actor_id: int, params: dict[str, Any], db=Depends(get_db)):
    update_patch(db,"actor",actor_id,params,"Actor",ACTOR_FIELDS)
    return {"message": "Actor updated"}

@app.get("/movies/{movie_id}/actors")
def get_actors_for_movie(movie_id: int, db=Depends(get_db)):
    rows = db_execute(
        db,
        "SELECT a.id, a.name, a.surname FROM actor a JOIN movie_actor_through mat ON a.id = mat.actor_id WHERE mat.movie_id = :id",
        {"id": movie_id},
        fetchall=True
    )

    if not rows:
        raise HTTPException(
            404,
            "Movie or actor not found"
        )

    return [row_to_dict(r, ACTOR_FIELDS) for r in rows]

@app.post("/movies/{movie_id}/actors/{actor_id}")
def add_actor_to_movie(movie_id: int, actor_id: int, db=Depends(get_db)):
    get_one(db, "movie", movie_id, ["id"], "Movie")
    get_one(db, "actor", actor_id, ["id"], "Actor")

    existing = db_execute(
        db,
        "SELECT 1 FROM movie_actor_through WHERE movie_id=:movie_id AND actor_id=:actor_id",
        {"movie_id": movie_id, "actor_id": actor_id},
        fetchone=True
    )
    if existing:
        raise HTTPException(
            400,
            "Actor already assigned to this movie"
        )
    create(db, "movie_actor_through", {"movie_id": movie_id, "actor_id": actor_id})
    return {"message": "Actor added to movie", "movie_id": movie_id, "actor_id": actor_id}

@app.delete("/movies/{movie_id}/actors/{actor_id}")
def remove_actor_from_movie(movie_id: int, actor_id: int, db=Depends(get_db)):
    cursor = db_execute(
        db,
        "DELETE FROM movie_actor_through WHERE movie_id=:movie_id AND actor_id=:actor_id",
        {"movie_id": movie_id, "actor_id": actor_id}
    )
    if cursor.rowcount == 0:
        raise HTTPException(
            404,
            "Actor not assigned to this movie"
        )
    return {"message": "Actor removed from movie"}
