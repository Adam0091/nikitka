import {UiPopup} from './../../UI/UiPopup';
import { Alert, TextField, TextareaAutosize, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import style from "./FormRole.module.scss"
import { useState } from 'react';
import { sendData } from '../../../utils/network';
import { ROLES_URL } from '../../../constants';

export const FormRole = ({isOpen, setIsOpen, roles, updatePage}) => {

  const [roleData, setRoleData] = useState({
    name: '',
    description: '',
  })

  const [AlertData, setAlertData] = useState({
    text: '',
    type: '',
    show: false,
  })

  const [disableButton, setDisableButton] = useState(false)


  const inputAreError = () => {
    return !roleData.name
  }

  const handleOnChangeInput = (event, type) => {
    if( type === 'name'){
      setRoleData(prev => ({...prev, name: event.target.value}))
    }
    if( type === 'description') {
      setRoleData(prev => ({...prev, description: event.target.value}))
    }
  }

  const handleCreateNewRole = async () => {
    setDisableButton(true);
    const res = await sendData(ROLES_URL, {
      ...roleData
    })
    
    if(res.ok){
      setAlertData({
        text: "Успешно",
        type: "success",
        show: true,
      })
      setTimeout(function(){
        setAlertData({
          text: '',
          type: '',
          show: false,
        })
        setRoleData({
          name: '',
          description: '',
        })
        setIsOpen(false);
        setDisableButton(false);
        updatePage()
      }, 1000)

    }
    else {
      setAlertData({
        text: "Ошибка",
        type: "error",
        show: true,
      })
      setTimeout(function(){
        setAlertData({
          text: '',
          type: '',
          show: false,
        })
        setDisableButton(false);
      }, 1000)
    }
  }

  return (
    <UiPopup open={isOpen}
      setOpen={setIsOpen}>
      <form className={style.form_role}>
      <span>Создание новой роли</span>
        <TextField label="Название роли" variant="outlined"
          error={!roleData.name}
          value={roleData.name}
          onChange={ (event) => handleOnChangeInput(event, 'name') } />

        <div className={style.form_role__textarea}>
        <TextareaAutosize
          minRows={3}
          value={roleData.description}
          onChange={(event)=>handleOnChangeInput(event, 'description')}
          placeholder="Описание"
          style={
            {
              width: "100%",
              height: "100px"
            }
          }/>
        </div>

        {/* <FormGroup> {
          roles.map(type => (
            <FormControlLabel control={<Checkbox/>}
              label={type}/>
          ))
        } </FormGroup> */}

        <Button variant="contained" disabled={disableButton || inputAreError()} onClick={handleCreateNewRole}>Создать новый роль</Button>
        {AlertData.show && <Alert severity={AlertData.type}>{AlertData.text}</Alert>}
      </form>
    </UiPopup>
  )
}
