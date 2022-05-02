from flask import Blueprint, render_template, redirect
from app.models.db import db
from app.models.album import Album
from app.forms.add_album_form import AlbumForm
from app.models.photo import Photo
from flask_login import current_user

albums_router = Blueprint("albums", __name__)

# GET all Albums
@albums_router.route("/all")
def all_albums():
  results = Album.query.all()
  print(results)
  return { "albums": [album.to_dict() for album in results] }

# POST new Album
@albums_router.route("/add_album", methods=["GET", "POST"])
def add_album():
  user_id = current_user.id
  form = AlbumForm()

  print("&&&&&&&=====>>>>>>>>>", form.errors)

  if form.validate_on_submit():
    new_album = Album(
      user_id = user_id,
      title = form.data["title"]
    )
    print("======>>>>>>>", new_album)
    db.session.add(new_album)
    db.session.commit()
    return redirect("/api/albums/all")

  return render_template("test.html", form=form)

# GET single Album by id
@albums_router.route("<int:id>")
def single_album(id):
  album = Album.query.get(id)
  return album.to_dict()

# UPDATE Album
@albums_router.route("/<int:id>/edit", methods=["PUT", "GET"])
def update_album(id):
  album = Album.query.get(id)
  form = AlbumForm()
  if form.validate_on_submit():
    album.title = form.data["title"]
    db.session.commit()
    return redirect("/{id}")

  return render_template("test.html", form=form)
