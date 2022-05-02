from .db import db

class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(15), nullable=False)

    # photos = db.relationship("Photo", back_populates="tags")
