from lib2to3.pgen2 import pgen
from flask import Blueprint, jsonify, render_template,redirect, request, session
from app.models import db, Photo, User, Comment
from app.forms.new_photo_form import NewPhotoForm,EditPhotoForm
from app.forms.new_comment_form import NewCommentForm
from flask_login import current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.aws3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)

photo_routes = Blueprint('photos', __name__, url_prefix="/photos")

# Getting all photos
# GET /photos
# WORKS
@photo_routes.route('/all')
def photos():
    photos = Photo.query.all()
    # print(photos)
    return {'photos' : [photo.to_dict() for photo in photos]}
    # return render_template("new_photo.html", form=form)

# Create a photo
# POST /photos
# WORKS
@photo_routes.route('/add_photo', methods = ["POST"])
def create_photo():
    form = NewPhotoForm()
    user_id = current_user.get_id()
    # print(user_id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if "image" not in request.files:
            return {"errors": "image required"}, 400

        image = request.files["image"]

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        print('uploading', upload)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        photo_url = upload["url"]

        new_photo = Photo(user_id = current_user.id,title = form.data["title"],description = form.data["description"],photo_url = photo_url)

        print( "NEW PHOTO:", new_photo.to_dict())
        # add data to db
        # print(form.data)
        # data = {
        #     "user_id" : session['_user_id'],
        #     "title" : form.data["title"],
        #     "description" : form.data["description"],
        #     "photo_url" : form.data["photo_url"]
        # }

        # new_photo = Photo(**data)


        db.session.add(new_photo)
        db.session.commit()
        return {"url": photo_url}

    return {"errors": validation_errors_to_error_messages(form.errors)}

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
    photo = {'photo': photo.to_dict(),'comments' : [comment.to_dict() for comment in comments]}
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
    return {"errors": validation_errors_to_error_messages(form.errors)}

# Update specific photo
# PUT /photos/:photoId
# NOT WORKS FOR NOW
@photo_routes.route('/<int:id>/edit',methods=["PATCH"])
def update_photo(id):
    photo = Photo.query.get(id)
    data = photo.to_dict()
    print("PHOTO PLEASE RING UP",photo.to_dict())
    print('DATA TITLE',data['title'])
    form = EditPhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if(not form['title'].data):
            photo.title = data['title']
        else:
            photo.title = form['title'].data
        if(not form['description'].data):
            photo.description = data['description']
        else:
            photo.description = form['description'].data
        if(not form['photo_url'].data):
            photo.photo_url = data['photo_url']
        else:
            photo.photo_url = form['photo_url'].data
        print('PHOTO SUBMIT', photo.to_dict())
        db.session.commit()
        return photo.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}


# Delete specific photo
# DELETE /photos/:photoId
# WORKS
@photo_routes.route('/<int:id>', methods=["DELETE"])
def delete_photo(id):
    photo = Photo.query.get(id)
    db.session.delete(photo)
    db.session.commit()
    return photo.to_dict()
