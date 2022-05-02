from .db import db

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False),
    photo_url = db.Column(db.String(), nullable=False),
    title = db.Column(db.String(), nullable=False),

    user = db.relationship('User',back_populates='user', cascade="all, delete")
