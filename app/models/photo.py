from .db import db

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)
    photo_url = db.Column(db.String(), nullable=False)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.String())

    user = db.relationship('User',back_populates='photos')
    comments = db.relationship('Comment', back_populates='photos', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'photo_url': self.photo_url,
            'title' : self.title,
            'description' : self.description
        }
