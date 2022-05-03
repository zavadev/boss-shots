from flask_wtf import FlaskForm
from wtforms import IntegerField, SubmitField
from wtforms.validators import DataRequired

class AddPhotoToAlbumForm(FlaskForm):
  photo_id = IntegerField("id", validators=[DataRequired()])
  submit = SubmitField("submit")
