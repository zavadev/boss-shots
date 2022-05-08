from flask_wtf import FlaskForm
from sqlalchemy import values
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class NewCommentForm(FlaskForm):
    comment = StringField("Comment", validators=[DataRequired()])
    submit = SubmitField("Add Comment")
