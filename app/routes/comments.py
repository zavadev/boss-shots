from lib2to3.pgen2 import pgen
from flask import Blueprint, jsonify, render_template,redirect, request
from app.models import db, Photo, User, Comment
from app.forms.new_photo_form import NewPhotoForm,EditPhotoForm
from app.forms.new_comment_form import NewCommentForm
from flask_login import current_user,login_required

comment_routes = Blueprint('comments', __name__, url_prefix="/comments")

# WORKS
@comment_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_comment(id):
    print('ENTER ROUTE DELETE')
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()
