import {Stack, TextField} from '@mui/material';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {useEffect, useState} from 'react';
import {UiPopup} from '../UI/UiPopup';
import {LocalizationProvider} from '@mui/x-date-pickers';

import styles from './ObjectInfo.module.scss';
import { OrderList } from '../OrderList/OrderList';
import { getApiResource } from './../../utils/network';
import { ORDERS_URL } from '../../constants';

export const ObjectInfo = ({object, data, isOpen, setIsOpen}) => {
  const [date, setDate] = useState(new Date())
  const [orders, setOrders] = useState([]);

  const handleChange = (newValue) => {
    console.log(newValue)
    setDate(newValue);
  };

  const getResources = async () => {
    const res = await getApiResource(ORDERS_URL, {
      object_id: object.id
    })

    if(res.ok)
      setOrders(res.orders)
      console.log(res.orders)
  }

  useEffect(() => {
    getResources()
  }, [date])

  return (
    <UiPopup open={isOpen}
      setOpen={setIsOpen}>
      <div className={styles.object_info}>
        <div className={styles.object_info__row}>
          <div className={styles.object_info__column}>
            <div className={styles.object_info__description}>
              <h2>Объект</h2>

              <div className={styles.description__item}>
                <span className={styles.description__text}>Название объекта:</span>
                <span className={styles.description__value}>{object.name}</span>
              </div>

              <div className={styles.description__item}>
                <span className={styles.description__text}>Тип объекта:</span>
                <span className={styles.description__value}>{data.types[object.type]?.name}</span>
              </div>

              <div className={styles.description__item}>
                <span className={styles.description__text}>Кампус:</span>
                <span className={styles.description__value}>{data.campus[object.campus]?.name}</span>
              </div>

              <div className={styles.description__item}>
                <span className={styles.description__text}>Этаж:</span>
                <span className={styles.description__value}>{object.floor}</span>
              </div>

              <div className={styles.description__item}>
                <span className={styles.description__text}>Комната:</span>
                <span className={styles.description__value}>{object.room}</span>
              </div>

              <div className="">
                <span className={styles.description__text}>Описаине:</span>
                <p className={styles.description__paragraph}>{object.description}</p>
              </div>
            </div>

          </div>

          {
          object.image && (
            <div className={
              styles.object_info__column
            }>
              <div className={
                styles.object_info__images
              }>
                <img src={
                    object.images
                  }
                  alt={
                    object.name
                  }/>
              </div>
            </div>
          )
        } </div>
        <div className={
          styles.object_info__row
        }>
          <div className={
            styles.object_info__column
          }>
            <div className={
              styles.object_info__data
            }>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={1}>
                  <DesktopDatePicker label="Выбирите дату брони" inputFormat="dd/MM/yyyy"
                    value={date}
                    onChange={handleChange}
                    renderInput={
                      (params) => <TextField {...params}/>}
                  />
                </Stack>
            </LocalizationProvider>
            <div className="">
              {orders.length === 0 ? "Список броней пуст" : <OrderList orders={orders}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  </UiPopup>
  )
}
