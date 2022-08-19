import styles from './ObjectsList.module.scss';
import {ObjectItem} from './../ObjectItem';

export const ObjectsList = ({objects, data}) => {
  return (
    <div className={
      styles.objects_list
    }>
      {
      objects.map(object => (
        <ObjectItem key={
            object.id
          }
          object={object}
          data={data}/>
      ))
    } </div>
  )
}
