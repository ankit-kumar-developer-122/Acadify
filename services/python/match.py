"""Local, explainable tutor matching using synthetic catalog data only."""
import json
import sys

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def main():
    payload = json.load(sys.stdin)
    tutors = payload.get("tutors", [])
    subject = payload.get("subject", "")
    mode = payload.get("mode", "Online or in-person")
    goal = payload.get("goal", "")
    frame = pd.DataFrame(tutors)
    if frame.empty:
        print(json.dumps({"matches": []}))
        return

    frame["search_text"] = frame.apply(
        lambda row: " ".join([row.get("headline", ""), row.get("bio", ""), " ".join(row.get("subjects", []))]), axis=1
    )
    vectorizer = TfidfVectorizer(ngram_range=(1, 2), stop_words="english")
    corpus = vectorizer.fit_transform(frame["search_text"].tolist() + [f"{subject} {goal}"])
    semantic = cosine_similarity(corpus[-1], corpus[:-1]).ravel()
    ranked = []
    for index, row in frame.iterrows():
        topics = [str(topic).casefold() for topic in row.get("subjects", [])]
        mode_match = mode == "Online or in-person" or mode in row.get("mode", [])
        subject_match = subject.casefold() in topics
        if not mode_match or not subject_match:
            continue
        score = 0.72 + min(float(semantic[index]), 1.0) * 0.18 + min(float(row.get("rating", 0)) / 5, 1) * 0.10
        ranked.append({"id": row["id"], "score": round(score, 3), "reasons": [f"Teaches {subject}", f"Offers {mode if mode != 'Online or in-person' else row['mode'][0]} sessions", "Ranked from the local sample catalog"]})
    ranked.sort(key=lambda item: item["score"], reverse=True)
    print(json.dumps({"matches": ranked[:4], "method": "TF-IDF similarity plus subject, mode, and rating fit", "demoOnly": True}))


if __name__ == "__main__":
    main()
