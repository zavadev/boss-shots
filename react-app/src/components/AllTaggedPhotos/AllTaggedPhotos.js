import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './AllTaggedPhotos.css';
import { getAllTaggedPhotos } from '../../store/tags'

export default function AllTaggedPhotos() {
  const dispatch = useDispatch();
  const { tag_id } = useParams()
  const tag = useSelector(state => state.tags)

  useEffect(() => {
    dispatch(getAllTaggedPhotos(tag_id))
  }, [dispatch])

  return (
    <>
      <div><h1>{tag?.tag_name}</h1></div>
      <div>
        <dl>
          {tag?.photos.map(photo => (
            <dt key={photo?.id}><img src={photo?.photo_url} alt={photo?.title}/></dt>
          ))}
        </dl>
      </div>
    </>
  )
}
