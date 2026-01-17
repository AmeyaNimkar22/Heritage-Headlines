from flask import Flask, request, jsonify
from flask_cors import CORS
from services.geminiService import run_heritage_analysis

app = Flask(__name__)
CORS(app)

@app.route("/api/ai-analysis", methods=["POST"])
def ai_analysis():
    data = request.json

    heritage_name = data.get("heritageName")
    description = data.get("description")

    if not heritage_name or not description:
        return jsonify({"error": "Missing data"}), 400

    prompt = f"""
You are a cultural heritage expert.

Analyze the following heritage site:

Name: {heritage_name}
Description: {description}
Do comprehensive Heritage Sentiment Analysis using
PASSIONIT and PRUTL dimensions
PASSIONIT - Probing, Innovating, Acting, Scoping, setting, owning, nurturing, Internal Transformation

PRUTL - positive soul (peace, respect, unity, trust, love)  negative soul (pride, rule usurp, tempt, lust)
positive materialism (protector, recycler, positive utility, longevity, tangibility)
negative materialism (possession, rot, trade, lessen, negative utility)

and also derive lessons to Learn from the Heritage and reveal design architectures if any can be used for LLM models.

"""

    try:
        analysis = run_heritage_analysis(prompt)

        return jsonify({
            "analysis": analysis
        })

    except Exception as e:
        print("Gemini error:", e)
        return jsonify({"error": "AI analysis failed"}), 500


if __name__ == "__main__":
    app.run(port=5001, debug=True)
