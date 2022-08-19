
import styles from './OrderList.module.scss'

export const OrderList = ({orders}) => {
  return (
    <div className={styles.orders_list}>
      {orders.map((order) => (
        <div className={styles.orders_list__order}>
          <h6 className={styles.order__name}>{order.name}</h6>
          <p className={styles.order__description}>{order.description}</p>
        </div>
      ))}
    </div>
  )
}