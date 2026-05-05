from flask import Flask
from flask_cors import CORS
from database import db
from routes.auth import auth_routes
from routes.chat import chat_routes
import os

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'chatbot.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'supersecretkey123'

CORS(app, resources={r"/api/*": {"origins": "*"}})

db.init_app(app)
app.register_blueprint(auth_routes, url_prefix='/api')
app.register_blueprint(chat_routes, url_prefix='/api')

with app.app_context():
    db.create_all()
    print(" Database ready!")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)