from flask import Blueprint, render_template, redirect, request
from sqlalchemy import delete
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

  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_album = Album(
      user_id = user_id,
      title = form.data["title"]
    )
    print("======>>>>>>>", new_album)
    db.session.add(new_album)
    db.session.commit()
    return  new_album.to_dict()

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
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    album.title = form.data["title"]
    db.session.commit()
    return album.to_dict()

  return render_template("test.html", form=form)

#DELETE an Album
@albums_router.route("/<int:id>", methods=["DELETE"])
def delete_album(id):
  album = Album.query.get(id)
  db.session.delete(album)
  db.session.commit()
  return {"SUCESS": "DELETED"}
