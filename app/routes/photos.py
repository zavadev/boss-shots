from lib2to3.pgen2 import pgen
from flask import Blueprint, jsonify, render_template,redirect, request
from app.models import db, Photo, User, Comment
from app.forms.new_photo_form import NewPhotoForm,EditPhotoForm
from app.forms.new_comment_form import NewCommentForm
from flask_login import current_user

photo_routes = Blueprint('photos', __name__, url_prefix="/photos")

# Getting all photos
# GET /photos
# WORKS
@photo_routes.route('/all')
def photos():
    photos = Photo.query.all()
    form = NewPhotoForm()
    # print(photos)
    return {'photos' : [photo.to_dict() for photo in photos]}
    # return render_template("new_photo.html", form=form)

# Create a photo
# POST /photos
# WORKS
@photo_routes.route('/add_photo', methods = ["GET","POST"])
def create_photo():
    form = NewPhotoForm()
    user_id = current_user.get_id()
    # print(user_id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # add data to db
        # print(form.data)

        title = form.data["title"]
        photo_url = form.data["photo_url"]
        description = form.data["description"]

        new_photo = Photo(
            user_id = user_id,
            title = title,
            description = description,
            photo_url = photo_url
        )

        db.session.add(new_photo)
        db.session.commit()
        return new_photo.to_dict()

        # with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
        #     with conn.cursor() as curs:
        #         curs.execute(
        #         """
        #         INSERT INTO photos (title, photo_url,user_id,description)
        #         VALUES (%(title)s, %(photo_url)s,%(user_id)s,%(description)s)
        #         """,
        #         {
        #             "title": title,
        #             "photo_url": photo_url,
        #             "user_id" : user_id,
        #             "description" : description
        #         }
        #     )

        # return redirect("/api/photos/all")
    return render_template("new_photo.html", form=form)

# Get one photo
# GET /photos/:photoId
# Getting all comments
# GET /photos/:photoId
# WORKS
@photo_routes.route('/<int:id>')
def photo(id):
    # grabs photo of the id
    photo = Photo.query.get(id)
    # filters data to grab all comments with photoid
    comments = Comment.query.filter(Comment.photo_id == id).all()
    photo = {'photo ': photo.to_dict(),'comments' : [comment.to_dict() for comment in comments]}
    return photo

# Create a comment
# POST /photos/:photoId
# WORKS
@photo_routes.route('/<int:id>/comment',methods=["GET","POST"])
def add_comment(id):
    form = NewCommentForm()
    user_id = current_user.id

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        comment = form.data['comment']

        new_comment = Comment(
            photo_id = id,
            user_id = user_id,
            comment = comment
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()

    return render_template("new_comment.html", form=form)

# Update specific photo
# PUT /photos/:photoId
# NOT WORKS FOR NOW
@photo_routes.route('/<int:id>/edit',methods=["PUT"])
def update_photo(id):
    form = EditPhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    print('DATA',data)
    if form.validate_on_submit():
        photo = Photo.query.get(id)
        print('===============================================')
        photo.photo_url = data['photo_url']
        photo.title = data["title"]
        photo.description = data["description"]

        db.session.commit()
        return photo.to_dict()



# Delete specific photo
# DELETE /photos/:photoId
# WORKS
@photo_routes.route('/<int:id>', methods=["DELETE"])
def delete_photo(id):
    photo = Photo.query.get(id)
    db.session.delete(photo)
    db.session.commit()
    return photo.to_dict()
