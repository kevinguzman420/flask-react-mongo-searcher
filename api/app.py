from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
import os

app = Flask(__name__)
app.config["MONGODB_SETTINGS"] = {
    "db": os.getenv("MONGO_DBNAME"),
    "host": os.getenv("MONGO_HOST") 
}
db = MongoEngine(app)

from models import Movies

@app.route("/api/v1/movies", methods=["GET"])
def get_movies():
    data = Movies.get_all()
    return data


@app.route("/api/v1/movies", methods=["POST"])
def create_movies():
    data = request.get_json()
    new_movie = Movies(title=data["title"], year=data["year"],
                       rated=data["rated"], director=data["director"], actors=data["actors"])
    new_movie.save()
    return jsonify(msg="New movie has been created")

@app.route("/api/v1/searcher/<key>", methods=["GET"])
def searcher(key=None):
    if key is not None:
        matches = Movies.searcher(key)
        return jsonify(matches)
    return jsonify(key="There's not match")


if __name__ == "__main__":
    app.run(debug=True)
