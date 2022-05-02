from .db import db

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)
    photo_url = db.Column(db.String(500), nullable=False)
    title = db.Column(db.String(25), nullable=False)
    description = db.Column(db.String(255))

    user = db.relationship('User',back_populates='photos')
    comments = db.relationship('Comment', back_populates='photo', cascade="all, delete")
    favorites = db.relationship('Favorite', back_populates='photo')
    # tags = db.relationship('Tag', back_populates='photos')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'photo_url': self.photo_url,
            'title' : self.title,
            'description' : self.description
        }
