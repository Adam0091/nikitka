
import styles from './OrderList.module.scss'

export const OrderList = ({orders, date}) => {
  const isEquealDate = (date1, date2) => {
    if(date1.getFullYear() !== date2.getFullYear()) return false;
    if(date1.getMonth() !== date2.getMonth()) return false;
    if(date1.getDate() !== date2.getDate()) return false;

    return true;
  }

  if(!orders || orders.length === 0)
    return (
      <div className={styles.orders_list}>
        <span>Нет броней</span>
      </div>
    )

  return (
    <div className={styles.orders_list}>
      <span>Список броней:</span>
      {orders.map((order) => {
        
        if(!isEquealDate(date, new Date(order.time_start)))
          return <p key={order.id}>На эту дату нет брони</p>
        else 
        return (
          <div className={styles.orders_list__order} key={order.id}>
          <div className={styles.order__item}>
            <span>Логин: </span>
            <span className={styles.order__value}>{order.login}</span>
          </div>

          <div className={styles.order__item}>
            <span>Начало: </span>
            <span className={styles.order__value}>{order.time_start}</span>
          </div>
          <div className={styles.order__item}>
            <span>Конец: </span>
            <span className={styles.order__value}>{order.time_end}</span>
          </div>

          <div className={styles.order__item}>
            <span>Описание: </span>
            <p className={styles.order__value}>{order.description}</p>
          </div>
        </div>
        )
      })}
    </div>
  )
}