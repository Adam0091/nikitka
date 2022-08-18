import {useState} from "react";

import {Button, Autocomplete, TextField} from "@mui/material"
import {CAMPUS, TYPE_OBJECT} from "../../constants";
import {FormObject} from "../Forms/FormObject";

import styles from "./Header.module.scss";
import {FormRole} from "../Forms/FormRole";
import {FormTypeObject} from "../Forms/FormTypeObject/FormTypeObject";

export const Header = () => {
  const [openObjectForm, setOpenObjectForm] = useState(false)
  const [openRoleForm, setOpenRoleForm] = useState(false)
  const [openTypeObjectForm, setOpenTypeObjectForm] = useState(false)

  const handleOpenObjectForm = () => setOpenObjectForm(true)
  const handleOpenRoleForm = () => setOpenRoleForm(true)
  const handleOpenTypeObjectForm = () => setOpenTypeObjectForm(true)


  return (
    <>
      <header className={
        styles.header
      }>
        <div className={
          styles.header__container
        }>
          <div className={
            styles.header__buttons
          }>
            <Button onClick={handleOpenObjectForm}
              variant="contained">Cоздать объект</Button>
            <Button onClick={handleOpenRoleForm}
              variant="contained">Создать роль</Button>
            <Button onClick={handleOpenTypeObjectForm}
              variant="contained">Создать тип объекта</Button>
          </div>

          <div className={
            styles.header__filters
          }>
            <div className={
              styles.filter__campus
            }>
              <Autocomplete disablePortal
                options={CAMPUS}
                sx={
                  {width: 300}
                }
                renderInput={
                  (params) => <TextField {...params} label="Выбирите кампус "/>}
                />
            </div>

          <div className={
            styles.Buttonfilter__type
          }>
            <Autocomplete disablePortal
              options={TYPE_OBJECT}
              sx={
                {width: 300}
              }
              renderInput={
                (params) => <TextField {...params} label="Типы объекта "/>}
              />
          </div>
      </div>
    </div>
  </header>
  <FormObject isOpen={openObjectForm}
    setIsOpen={setOpenObjectForm}/>
  <FormRole isOpen={openRoleForm}
    setIsOpen={setOpenRoleForm}/>
  <FormTypeObject isOpen={openTypeObjectForm}
    setIsOpen={setOpenTypeObjectForm}/>
</>
  )
}
