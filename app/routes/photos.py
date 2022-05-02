from flask import Blueprint, jsonify, render_template,redirect
import psycopg2
from app.models import Photo, User
from app.forms.new_photo_form import NewPhotoForm

photo_routes = Blueprint('photos', __name__, url_prefix="/photos")

CONNECTION_PARAMETERS = {
                          'dbname': 'bossshot_app',
                          'user': 'bossshot_dev',
                          'password': 'password',
}

# Getting all photos /photos
@photo_routes.route('/')
def photos():
    photos = Photo.query.all()
    form = NewPhotoForm()
    # print(photos)
    # return {'photos' : [photo.to_dict() for photo in photos]}
    return render_template("new_photo.html", form=form)

@photo_routes.route('/', methods = ["GET","POST"])
def create_photo():
    form = NewPhotoForm()

    if form.validate_on_submit():
        # add data to db
        print(form.data)

        title = form.data["title"]
        photo_url = form.data["photo_url"]
        description = form.data["description"]

        with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
            with conn.cursor() as curs:
                curs.execute(
                """
                INSERT INTO photos (title, photo_url,user_id,description)
                VALUES (%(title)s, %(photo_url)s,%(user_id)s,%(description)s)
                """,
                {
                    "title": title,
                    "photo_url": photo_url,
                    "user_id" : 1,
                    "description" : description
                }
            )

        return redirect("/")
    return render_template("new_photo.html", form=form)
