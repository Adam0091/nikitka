
import styles from './ObjectsList.module.scss';
import { ObjectItem } from './../ObjectItem';

export const ObjectsList = ({objects = ['1','2']}) => {
  return (
    <div className={styles.objects_list}>
      {objects.map(object=> (
        <ObjectItem key={object} />
      )) }
    </div>
  )
}