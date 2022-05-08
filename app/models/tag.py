from .db import db
from .tagged_photos import tagged_photos

class Tag(db.Model):
  __tablename__ = 'tags'

  id = db.Column(db.Integer, primary_key=True)
  tag_name = db.Column(db.String(15), nullable=False, unique=True)

  photos = db.relationship("Photo", back_populates="tags", secondary=tagged_photos)

  def photosToDict(self):
    result = {
      "id": self.id,
      "tag_name": self.tag_name,
      "photos": [photo.to_dict() for photo in self.photos]
    }
    return result

  def to_dict(self):
    return {
      "id": self.id,
      "tag_name": self.tag_name,
    }
