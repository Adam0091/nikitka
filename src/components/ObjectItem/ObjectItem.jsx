
import styles from './ObjectItem.module.scss';


export const ObjectItem = ({object= {}}) => {
  return (
    <div className={styles.object}>
      <div className={styles.object__image}>
        <img src="" alt="" />
      </div>

      <div className={styles.object__description}>
        <h3 className={styles.description__name}>Название</h3>
        <p className={styles.description__text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora quidem exercitationem facere sapiente cum sit veritatis nesciunt. Earum itaque ullam maiores, accusamus commodi ut saepe aspernatur enim illum optio repellendus.</p>
      </div>
    </div>
  )
}