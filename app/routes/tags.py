from flask import Blueprint, render_template, request
from app.models.db import db
from app.models.tag import Tag
from app.forms.create_tag_form import CreateTagForm
from app.api.auth_routes import validation_errors_to_error_messages

tags_router = Blueprint("tags", __name__)

# GET all Tags
@tags_router.route("/all")
def all_tags():
  results = Tag.query.all()
  return { "tags": [tag.to_dict() for tag in results] }

# POST (CREATE) new Tag
@tags_router.route("/create_tag", methods=["GET", "POST"])
def create_tag():
  form = CreateTagForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  tags = Tag.query.all()
  results = {"tag_id": [tag.id for tag in tags if tag.tag_name == form.data["tag_name"]]}
  print("lenght result ----->",len(results["tag_id"]))
  if len(results["tag_id"]) > 0:
    return {"id": results["tag_id"][0]}


  if form.validate_on_submit():
    new_tag = Tag(
      tag_name = form.data['tag_name']
    )
    db.session.add(new_tag)
    db.session.commit()

    return new_tag.to_dict()

  return {"errors": validation_errors_to_error_messages(form.errors)}

#GET single Tag
@tags_router.route('/<int:id>/photos', methods=["GET"])
def tags_photos(id):
  tag = Tag.query.get(id)
  return tag.photosToDict()
