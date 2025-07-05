from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle, os, numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model_dir = os.path.join(os.path.dirname(__file__), "models")
popular_df = pickle.load(open(os.path.join(model_dir, 'popular.pkl'), 'rb'))
pt = pickle.load(open(os.path.join(model_dir, 'pt.pkl'), 'rb'))
books = pickle.load(open(os.path.join(model_dir, 'books.pkl'), 'rb'))
similarity_scores = pickle.load(open(os.path.join(model_dir, 'similarity_scores.pkl'), 'rb'))

class RecommendRequest(BaseModel):
    user_input: str

@app.get("/popular")
def get_popular():
    return {"books": popular_df[['Book-Title', 'Book-Author', 'Image-URL-M', 'num_ratings', 'avg_rating']].to_dict(orient='records')}

@app.post("/recommend")
def recommend(req: RecommendRequest):
    user_input = req.user_input
    try:
        index = np.where(pt.index == user_input)[0][0]
    except IndexError:
        return {"error": "Book not found"}

    similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:5]
    recommendations = []
    for i in similar_items:
        temp = books[books['Book-Title'] == pt.index[i[0]]].drop_duplicates('Book-Title')
        if not temp.empty:
            recommendations.append({
                "title": temp['Book-Title'].values[0],
                "author": temp['Book-Author'].values[0],
                "image": temp['Image-URL-M'].values[0]
            })
    return {"recommendations": recommendations}
