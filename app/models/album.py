from .db import db
from .photo_in_albums import photo_in_albums

class Album(db.Model):
    __tablename__ = 'albums'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(25))

    user = db.relationship('User',back_populates='albums')
    photos = db.relationship('Photo', back_populates='albums', secondary=photo_in_albums)


    def photos_to_dict(self):
        
        return {"photos": [photo.to_dict() for photo in self.photos]}
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            # "photos": self.photos
        }
