from app.models.album import db, Album


# Adds a demo user, you can add other users here if you want
def seed_albums():
    a1 = Album(
      user_id='1',
      title='Bad Ass Bosses',
    )
    a2 = Album(
      user_id='1',
      title='Bosses with attitude',
    )
    a3 = Album(
      user_id='2',
      title='Bosses I just can not beat',
    )
    a4 = Album(
      user_id='3',
      title='Mean Bosses',
    )
    a5 = Album(
      user_id='3',
      title='Bosses Bosses',
    )
    a6 = Album(
      user_id='4',
      title='Big Bosses',
    )

    db.session.add(a1)
    db.session.add(a2)
    db.session.add(a3)
    db.session.add(a4)
    db.session.add(a5)
    db.session.add(a6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the albums table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_albums():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE;')
    db.session.commit()
