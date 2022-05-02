from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Album

class AlbumForm(FlaskForm):
  title = StringField('title', validators=[DataRequired(), Length(max=25)])
  submit = SubmitField('submit')
