import uuid
from datetime import datetime
from app.database import db

class ProductClick(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = db.Column(db.String(36), nullable=False)
    product_id = db.Column(db.String(36), nullable=False)
    clicked_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, nullable=False)
