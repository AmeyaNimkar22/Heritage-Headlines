from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Site(BaseModel):
    _id: str
    threatLevel: str
    restorationStatus: str
    relatedStories: list
    continent: str

def threat_score(level):
    return {"Low": 0.3, "Moderate": 0.6, "High": 0.9}.get(level, 0.3)

def restoration_score(status):
    return {
        "Stable": 0.3,
        "Under Restoration": 0.7,
        "Endangered": 0.9
    }.get(status, 0.3)

@app.post("/score-sites")
def score_sites(sites: List[Site]):
    scored = []

    for site in sites:
        score = (
            0.35 * threat_score(site.threatLevel)
            + 0.25 * min(len(site.relatedStories) / 10, 1)
            + 0.25 * restoration_score(site.restorationStatus)
            + 0.15 * 0.5  # region diversity placeholder
        )

        scored.append({
            "_id": site._id,
            "score": round(score, 3)
        })

    return sorted(scored, key=lambda x: x["score"], reverse=True)
