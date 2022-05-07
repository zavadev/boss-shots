from flask_wtf import FlaskForm
from sqlalchemy import values
from wtforms import StringField, SelectField, SubmitField,FileField
from wtforms.validators import InputRequired,DataRequired,Required

class NewPhotoForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    description = StringField("Description")
    image = StringField("Image",validators=[DataRequired()])
    submit = SubmitField("Add Photo")


class EditPhotoForm(FlaskForm):
    title = StringField("Title")
    description = StringField("Description")
    photo_url = StringField("Photo url")
    submit = SubmitField("Update Photo")
