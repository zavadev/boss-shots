from crypt import methods
from lib2to3.pgen2 import pgen
from flask import Blueprint, jsonify, render_template,redirect, request
import psycopg2
from app.models import db, Photo, User
from app.forms.new_photo_form import NewPhotoForm,EditPhotoForm
from flask_login import current_user

photo_routes = Blueprint('photos', __name__, url_prefix="/photos")

# Getting all photos
# GET /photos
@photo_routes.route('/all')
def photos():
    photos = Photo.query.all()
    form = NewPhotoForm()
    # print(photos)
    return {'photos' : [photo.to_dict() for photo in photos]}
    # return render_template("new_photo.html", form=form)

# Create a photo
# POST /photos
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

@photo_routes.route('/<int:id>')
def photo(id):
    photo = Photo.query.get(id)
    return photo.to_dict()

# Update specific photo
# PUT /photos/:photoId
@photo_routes.route('/<int:id>/edit',methods=["GET","PATCH"])
def update_photo(id):
    photo = Photo.query.get(id)
    print('PUT',photo)
    form = EditPhotoForm()
    if form.validate_on_submit():
        photo.photo_url = form["photo_url"].data
        photo.title = form["title"].data
        photo.description = form["description"].data

        db.session.commit()
        return photo.to_dict()
    return render_template("new_photo.html",form=form,photo=photo)



# Delete specific photo
# DELETE /photos/:photoId
@photo_routes.route('/<int:id>', methods=["DELETE"])
def delete_photo(id):
    photo = Photo.query.get(id)
    db.session.delete(photo)
    db.session.commit()
    return redirect("/api/photos/all")
