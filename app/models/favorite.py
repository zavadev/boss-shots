from .db import db

class Favorite(db.Model):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer(), nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'),nullable=False)
    photo_id = db.Column(db.Integer(), db.ForeignKey('photos.id'),nullable=False)

    user = db.relationship('User',back_populates='favorites')
    photo = db.relationship('Photo',back_populates='favorites')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'photo_id': self.photo_id,
        }
