from flask import Blueprint, request, jsonify
from models import User
from database import db
from werkzeug.security import generate_password_hash, check_password_hash

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data received'}), 400
        username = data.get('username', '').strip()
        password = data.get('password', '').strip()
        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400
        if User.query.filter_by(username=username).first():
            return jsonify({'error': 'Username already exists'}), 409
        user = User(
            username=username,
            password=generate_password_hash(password)
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({
            'message': 'Registered successfully',
            'user_id': user.id,
            'username': user.username
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_routes.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data received'}), 400
        username = data.get('username', '').strip()
        password = data.get('password', '').strip()
        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400
        user = User.query.filter_by(username=username).first()
        if not user or not check_password_hash(user.password, password):
            return jsonify({'error': 'Invalid username or password'}), 401
        return jsonify({
            'message': 'Login successful',
            'user_id': user.id,
            'username': user.username
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500