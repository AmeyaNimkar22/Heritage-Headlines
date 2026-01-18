import os

# ---------- OpenAI (Primary) ----------
from openai import OpenAI

openai_client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

OPENAI_MODEL = "gpt-4o-mini"  # fast + cheap + good for analysis


# ---------- Gemini (Fallback) ----------
try:
    from google import genai
    gemini_client = genai.Client(
        api_key=os.getenv("GEMINI_API_KEY")
    )
    GEMINI_MODEL = "gemini-2.5-flash"
except Exception:
    gemini_client = None


def run_heritage_analysis(prompt: str) -> str:
    """
    Tries OpenAI first.
    If OpenAI fails, falls back to Gemini.
    """

    # ---- OpenAI First ----
    try:
        response = openai_client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=[
                {"role": "system", "content": "You are a cultural heritage expert."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )
        return response.choices[0].message.content

    except Exception as openai_error:
        print("OpenAI error:", openai_error)

        # ---- Gemini Fallback ----
        if gemini_client:
            try:
                response = gemini_client.models.generate_content(
                    model=GEMINI_MODEL,
                    contents=prompt
                )
                return response.text
            except Exception as gemini_error:
                print("Gemini fallback error:", gemini_error)

        raise Exception("Both OpenAI and Gemini failed")
