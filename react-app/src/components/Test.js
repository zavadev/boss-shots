import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as tagActions from '../store/tags';
import { useHistory, useParams } from 'react-router-dom'

export default function Test() {
  const [tag_name, setTag_name] = useState("")
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch
  // })


  return (
    <>

    </>
  )
}
