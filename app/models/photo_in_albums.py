from .db import db

photo_in_albums = db.Table(
    "photo_in_albums",
    db.Column("photo_id",db.Integer, db.ForeignKey("photos.id"), primary_key=True),
    db.Column("album_id",db.Integer, db.ForeignKey("albums.id"), primary_key=True)
)
