from flask import Blueprint, jsonify, render_template,redirect
import psycopg2
from app.models import db, Photo, User
from app.forms.new_photo_form import NewPhotoForm
from flask_login import current_user

photo_routes = Blueprint('photos', __name__, url_prefix="/photos")

CONNECTION_PARAMETERS = {
                          'dbname': 'bossshot_app',
                          'user': 'bossshot_dev',
                          'password': 'password',
}

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
    user_id = current_user.id

    if form.validate_on_submit():
        # add data to db
        print(form.data)

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

        return redirect("/api/photos/all")

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
@photo_routes.route('/<int:id>')
def update_photo(id):
    photo = Photo.query.get(id)
    form = NewPhotoForm()

    if form.validate_on_submit():
        photo.photo_url = form.data["photo_url"]
        photo.title = form.data["title"]
        photo.description = form.data["description"]

        db.session.commit()

        return redirect("/")
