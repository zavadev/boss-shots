from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
# from .follows import follows


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    photos = db.relationship('Photo', back_populates='user', cascade="all, delete")
    # albums = db.relationship('Album', back_populates='user', cascade="all, delete")
    comments = db.relationship('Comment', back_populates='user', cascade="all, delete")
    # favorites  = db.relationship('Favorite', back_populates='user', cascade="all, delete")

    # this relationship allows you to access both the collection of users
    # that follow a given user (with user.followers), and the collection
    # of users that a user follows (with user.following)
    # followers = db.relationship(
    #     "User",
    #     secondary=follows,
    #     primaryjoin=(follows.c.follower_id == id),
    #     secondaryjoin=(follows.c.followed_id == id),
    #     backref=db.backref("following", lazy="dynamic"),
    #     lazy="dynamic"
    # )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
