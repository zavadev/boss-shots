from .db import db
from .tagged_photos import tagged_photos
from .photo_in_albums import photo_in_albums

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
    tags = db.relationship('Tag', back_populates='photos', secondary=tagged_photos)
    albums = db.relationship('Album', back_populates='photos', secondary=photo_in_albums)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'photo_url': self.photo_url,
            'title' : self.title,
            'description' : self.description,
            'tags': [ tag.to_dict() for tag in self.tags ]
        }
