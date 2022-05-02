from app.models import db, Comment


# Adds a demo user, you can add other users here if you want
def seed_comments():
    c1 = Comment(
        comment_id='1',
        photo_id='1',
        comment='This boss looks hard to beat, but not as hard to beat as Gimli the mighty Pomeranian'
    )
    c2 = Comment(
        comment_id='2',
        photo_id='1',
        comment='Gimli the mighty Pomeranian can finish this boss without problem'
    )
    c3 = Comment(
        comment_id='3',
        photo_id='2',
        comment='Gimli the mighty Pom has a bigger personality than this boss monster'
    )
    c4 = Comment(
        comment_id='1',
        photo_id='2',
        comment='This is a random comment, I hope you guys like it, it took a lot or effort to come up with it'
    )
    c5 = Comment(
        comment_id='2',
        photo_id='3',
        comment='This is also a random comment, but took a little less effort to write'
    )
    c6 = Comment(
        comment_id='3',
        photo_id='3',
        comment='This is an effort free comment, hope you like it as much though'
    )

    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)
    db.session.add(c5)
    db.session.add(c6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
