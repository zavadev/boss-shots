from app.models.tag import db, Tag


# Adds a demo user, you can add other users here if you want
def seed_tags():
    t1 = Tag(
      tag_name='Big'
    )
    t2 = Tag(
      tag_name='Mean'
    )
    t3 = Tag(
      tag_name='Ugly'
    )
    t4 = Tag(
      tag_name='Strong'
    )
    t5 = Tag(
      tag_name='Badass'
    )
    t6 = Tag(
      tag_name='Difficult'
    )

    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)
    db.session.add(t6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tags():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()
