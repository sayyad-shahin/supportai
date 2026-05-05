from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user
from chatbot_logic import get_bot_response

# Create Flask App
app = Flask(__name__)

# Configurations
app.config['SECRET_KEY'] = 'secret123'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chatbot.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Database Setup
db = SQLAlchemy(app)

# Login Setup
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


# ---------------- DATABASE MODELS ---------------- #

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))


class ChatHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_message = db.Column(db.String(500))
    bot_response = db.Column(db.String(500))


# ---------------- LOGIN LOADER ---------------- #

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


# ---------------- ROUTES ---------------- #

@app.route('/')
@login_required
def home():
    return render_template('index.html')


@app.route('/chat', methods=['POST'])
@login_required
def chat():

    data = request.get_json()

    if not data or 'message' not in data:
        return jsonify({'response': 'No message received'}), 400

    user_message = data['message']

    bot_response = get_bot_response(user_message)

    # Save chat history
    new_chat = ChatHistory(
        user_message=user_message,
        bot_response=bot_response
    )

    db.session.add(new_chat)
    db.session.commit()

    return jsonify({'response': bot_response})


@app.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'POST':

        username = request.form.get('username')
        password = request.form.get('password')

        user = User.query.filter_by(
            username=username,
            password=password
        ).first()

        if user:
            login_user(user)
            return redirect(url_for('home'))

        return render_template('login.html', error='Invalid Credentials')

    return render_template('login.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect('/login')


@app.route('/admin')
@login_required
def admin():

    total_chats = ChatHistory.query.count()

    return render_template(
        'admin.html',
        total_chats=total_chats
    )


# ---------------- MAIN RUN ---------------- #

if __name__ == '__main__':

    with app.app_context():

        db.create_all()

        existing_user = User.query.filter_by(username='admin').first()

        if not existing_user:

            admin_user = User(
                username='admin',
                password='admin123'
            )

            db.session.add(admin_user)
            db.session.commit()

    app.run(debug=True)