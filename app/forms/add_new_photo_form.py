from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length


class AddPhotoToAlbumForm(FlaskForm):
  title = StringField('title', validators=[Length(max=25)])
  submit = SubmitField('submit')
