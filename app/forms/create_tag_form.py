from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class CreateTagForm(FlaskForm):
  tag_name = StringField('Tag Name', validators=[DataRequired(), Length(max=25)])
  submit = SubmitField('Submit')
