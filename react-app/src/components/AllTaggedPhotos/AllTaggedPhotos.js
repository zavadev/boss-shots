import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './AllTaggedPhotos.css';
import { getAllTaggedPhotos } from '../../store/tags'

export default function AllTaggedPhotos() {
  const dispatch = useDispatch();
  const { tag_id } = useParams()
  const tag = useSelector(state => state?.tags)

  useEffect(() => {
    dispatch(getAllTaggedPhotos(+tag_id))
  }, [dispatch])

  return (
    <>
      <div id="all-tagged-container">
        <div id="tagged-photos-title">
          <div>#{tag[tag_id]?.tag_name}</div>
        </div>
        <div id="tagged-photos-div">
          <dl>
            {tag[tag_id]?.photos?.map(photo => (
              <dt key={photo?.id}><img src={photo?.photo_url} alt={photo?.title} className="tagged-photo"/></dt>
            ))}
          </dl>
        </div>
      </div>
    </>
  )
}
