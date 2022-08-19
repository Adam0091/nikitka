import {useState} from "react";

import {Button, Autocomplete, TextField} from "@mui/material"
import {FormObject} from "../Forms/FormObject";

import styles from "./Header.module.scss";
import {FormRole} from "../Forms/FormRole";
import {FormTypeObject} from "../Forms/FormTypeObject/FormTypeObject";

export const Header = ({data, objects, updatePage, filterOption, setFilterOption}) => {
  const campus = data.campus.map((item) => (item.name))
  const types = data.types.map((item) => (item.name))
  const roles = data.roles.map((item) => (item.name))

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

          <div className={styles.header__filters}>
            <div className={styles.filter__campus}>
              <Autocomplete disablePortal
                options={campus}
                sx={{width: 300}}
                inputValue={filterOption.campus}
                onInputChange={(event, newInputValue) => {
                  setFilterOption(prev => ({...prev, campus: newInputValue}));
                }}
                renderInput={(params) => <TextField {...params} label="Выбирите кампус "/>}
              />
            </div>

          <div className={styles.Buttonfilter__type}>
            <Autocomplete disablePortal
              options={types}
              sx={{width: 300}}
              inputValue={filterOption.type}
              onInputChange={(event, newInputValue) => {
                setFilterOption(prev => ({...prev, type: newInputValue}));
              }}
              renderInput={(params) => <TextField {...params} label="Типы объекта "/>}
            />
          </div>
      </div>
    </div>
  </header>
  <FormObject 
    isOpen={openObjectForm}
    setIsOpen={setOpenObjectForm} 
    campus={campus} 
    types={types} 
    roles={roles}
    objects={objects} 
    updatePage={updatePage}
  />
  <FormRole 
    isOpen={openRoleForm} 
    types={types} 
    updatePage={updatePage}
    setIsOpen={setOpenRoleForm}
  />
  {roles.length !== 0 && (<FormTypeObject 
    isOpen={openTypeObjectForm} 
    setIsOpen={setOpenTypeObjectForm}
    updatePage={updatePage}
    roles={roles}
  />)}
</>
  )
}
