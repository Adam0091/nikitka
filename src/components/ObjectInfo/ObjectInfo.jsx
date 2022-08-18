import {Stack, TextField} from '@mui/material';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {useState} from 'react';
import {UiPopup} from '../UI/UiPopup';
import {LocalizationProvider} from '@mui/x-date-pickers';

import styles from './ObjectInfo.module.scss';

export const ObjectInfo = ({
  object = {},
  isOpen,
  setIsOpen
}) => {
  const [data, setData] = useState(new Date())

  const handleChange = (newValue) => {
    setData(newValue);
  };

  return (
    <UiPopup open={isOpen}
      setOpen={setIsOpen}>
      <div className={
        styles.object_info
      }>
        <div className={
          styles.object_info__row
        }>
          <div className={
            styles.object_info__column
          }>
            <div className={
              styles.object_info__description
            }>
              <h2>Объект</h2>
              <div className={
                styles.description__item
              }>
                <span>Название объекта:
                </span>
                <span>String</span>
              </div>
              <div className={
                styles.description__item
              }>
                <span>Тип объекта:
                </span>
                <span>String</span>
              </div>
              <div className={
                styles.description__item
              }>
                <span>Кампус:
                </span>
                <span>String</span>
              </div>
              <div className={
                styles.description__item
              }>
                <span>Этаж:
                </span>
                <span>String</span>
              </div>
              <div className={
                styles.description__item
              }>
                <span>Комната:
                </span>
                <span>String</span>
              </div>
              <div className={
                styles.description__item
              }>
                <span>Описаине:
                </span>
                <p>String</p>
              </div>
            </div>

          </div>
          <div className={
            styles.object_info__column
          }>
            <div className={
              styles.object_info__images
            }>
              <img src="" alt=""/>
            </div>
          </div>
        </div>
        <div className={
          styles.object_info__row
        }>
          <div className={
            styles.object_info__column
          }>
            <div className={styles.object_info__data}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={1}>
                  <DesktopDatePicker label="Выбирите дату брони" inputFormat="dd/MM/yyyy"
                    value={data}
                    onChange={handleChange}
                    renderInput={
                      (params) => <TextField {...params}/>}
                    />
                </Stack>
            </LocalizationProvider>
            <div className="">
              Список броней
            </div>
          </div>
        </div>
      </div>
    </div>
  </UiPopup>
  )
}
