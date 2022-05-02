from lib2to3.pgen2 import pgen
from flask import Blueprint, jsonify, render_template,redirect, request
from app.models import db, Photo, User, Comment
from app.forms.new_photo_form import NewPhotoForm,EditPhotoForm
from app.forms.new_comment_form import NewCommentForm
from flask_login import current_user

comment_routes = Blueprint('comments', __name__, url_prefix="/comments")

@comment_routes.route('/<int:id>', methods=["DELETE"])
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return redirect("/api/photos/all")
