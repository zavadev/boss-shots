from app.models import db, Photo


def seed_photos():
    p1 = Photo(
      user_id = 1,
      photo_url='https://www.obsev.com/wp-content/uploads/sites/2/2018/03/Shadow-of-the-Colossus-Knight.jpg.optimal.jpg',
      title='Come to papa',
      description='A very big bad boss'
    )
    p2 = Photo(
      user_id = 1,
      photo_url='https://cdn3.whatculture.com/images/2019/05/a02b505427b61522-600x338.png',
      title='Sekiro boss',
      description='A very big bad boss in Sekiro the shadows die twice'
    )
    p3 = Photo(
      user_id = 2,
      photo_url='https://i0.wp.com/twinfinite.net/wp-content/uploads/2020/04/icon-of-sin.jpg?w=1280&ssl=1',
      title='Icon of Sin',
      description='A very big bad boss'
    )
    p4 = Photo(
      user_id = 2,
      photo_url='https://i0.wp.com/twinfinite.net/wp-content/uploads/2020/04/kid-buu.jpg?w=720&ssl=1',
      title='Kid Buu',
      description='A very big bad boss at Dragon Ball Z Kakarot'
    )
    p5 = Photo(
      user_id = 3,
      photo_url='https://primewikis.com/wp-content/uploads/FfKqHEO-1620x800.png',
      title='Valkyries at God of War',
      description="A very big bad boss at God of War, Kateryna's favorite boss ever"
    )
    p6 = Photo(
      user_id = 3,
      photo_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB2rrHDtUpMq3NKnWTN679H5PoK4mk0Ko9rQ&usqp=CAU',
      title='LeChuck',
      description="An undead pirate captain, LeChuck is obsessed with pursuing the affections of the series' heroine, Elaine Marley, and exacting revenge upon protagonist Guybrush Threepwood, who is responsible for consistently thwarting his plans."
    )


    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.add(p4)
    db.session.add(p5)
    db.session.add(p6)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the photos table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_photos():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
