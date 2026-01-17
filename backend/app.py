from flask import Flask
from flask_cors import CORS
from services.seeder import seed_daily_sites

app = Flask(__name__)
CORS(app)

seed_daily_sites()

from routes.sites import sites_bp
from routes.analysis import analysis_bp

app.register_blueprint(sites_bp)
app.register_blueprint(analysis_bp)

if __name__ == "__main__":
    app.run(debug=True)
