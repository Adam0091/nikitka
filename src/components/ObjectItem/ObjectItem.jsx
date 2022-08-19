import {useState} from 'react';
import {ObjectInfo} from '../ObjectInfo';
import styles from './ObjectItem.module.scss';

import image from '../../asssets/images/plug.png'


export const ObjectItem = ({object, data}) => {

  const [openObjectInfo, setOpenObjectInfo] = useState(false)

  const handelOpenObjectInfo = () => setOpenObjectInfo(true)

  return (
    <>
      <div onClick={handelOpenObjectInfo}
        className={
          styles.object
      }>
        <div className={
          styles.object__image
        }>
          <img src={object.images || image} alt={object.name}/>
        </div>

        <div className={
          styles.object__description
        }>
          <h3 className={
            styles.description__name
          }>{object.name}</h3>
          <p className={
            styles.description__text
          }>{object.description}</p>
        </div>
      </div>
      <ObjectInfo isOpen={openObjectInfo}
        setIsOpen={setOpenObjectInfo} object={object} data={data}/>
    </>
  )
}
