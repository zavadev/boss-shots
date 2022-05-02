from .db import db

tagged_photos = db.Table(
    "tagged_photos",
    db.Column("tag_id",db.Integer, db.ForeignKey("tags.id"), primary_key=True),
    db.Column("photo_id",db.String, db.ForeignKey("photos.id"), primary_key=True)
)
