from flask import Blueprint, request, jsonify
from app.models import ProductClick
from app.database import db

bp = Blueprint('product_clicks', __name__, url_prefix='/product_clicks')

@bp.route('/', methods=['POST'])
def create_product_click():
    data = request.json
    new_product_click = ProductClick(session_id=data['session_id'], product_id=data['product_id'])
    db.session.add(new_product_click)
    db.session.commit()
    return jsonify({'message': 'Product click created successfully.'}), 201

@bp.route('/<product_id>', methods=['GET'])
def get_product_clicks(product_id):
    clicks = ProductClick.query.filter_by(product_id=product_id).all()
    return jsonify([click.serialize() for click in clicks])
