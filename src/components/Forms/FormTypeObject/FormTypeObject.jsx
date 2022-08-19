import { useState } from 'react';

import {UiPopup} from './../../UI/UiPopup';
import {
  Alert,
  TextField,
  TextareaAutosize,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';

import { Button } from '@mui/material';

import style from "./FormTypeObject.module.scss"
import { TYPES_URL } from '../../../constants';
import { sendData } from '../../../utils/network';



export const FormTypeObject = ({isOpen, setIsOpen, roles, updatePage}) => {

  const rulesObj = roles.reduce((newObj, item) => {
    newObj[item] = false;
    return newObj;
  }, {})

  const [typeObject, setTypeObject] = useState(
    Object.assign({
      name: '',
      description: '',
    }, rulesObj)
  )

  const [AlertData, setAlertData] = useState({
    text: '',
    type: '',
    show: false,
  })

  const [disableButton, setDisableButton] = useState(false)


  const inputAreError = () => {
    let arrRolesIndex = [];

    roles.forEach((role, index) => {
      if(typeObject[role])
        arrRolesIndex.push(index);
    })

    return !typeObject.name || arrRolesIndex.length === 0
  }

  const handleOnChangeInput = (event, type) => {
    if (type === 'name')
      setTypeObject(prev => ({...prev, name: event.target.value}))

    if (type === 'description')
      setTypeObject(prev => ({...prev, description: event.target.value}))
  }

  const handleChangeCheckbox = (event, role) => {
    const value = event.target.checked;
    setTypeObject(prev => ({...prev, [role]: value}))
  }

  const handleCreateNewTypeObject = async (event) => {
    let arrRolesIndex = [];

    roles.forEach((role, index) => {
      if(typeObject[role])
        arrRolesIndex.push(index + 1);
    })


    const res = await sendData(TYPES_URL, {
      "name": typeObject.name,
      "description": typeObject.description,
      "roles": arrRolesIndex
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
        setTypeObject(Object.assign({
          name: '',
          description: '',
        }, rulesObj))
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
    <UiPopup open={isOpen} setOpen={setIsOpen}>
      <form className={style.form_type_object}>
        <span>Создание нового типа объекта</span>
        <TextField 
          label="Название типа объекта" 
          variant="outlined"
          value={typeObject.name}
          onChange={(event) => handleOnChangeInput(event, 'name')}
          error={!typeObject.name}
        />

        <div className={style.form_type_object__textarea}>
        <TextareaAutosize
          minRows={3}
          value={typeObject.description}
          onChange={(event) => handleOnChangeInput(event, 'description')}
          placeholder="Описание"
          style={{width: "100%",height: "100px"}
          }/>
        </div>

        <FormGroup className={style.form_type_object__checkboxs}> 
          {
            roles.map(role => (
              <FormControlLabel
                key={role} 
                checked={typeObject[role]}
                onChange={(event)=> handleChangeCheckbox(event, role)}
                name={role}
                control={<Checkbox/>}
                label={role}
              />
            ))
          } 
        </FormGroup>

        <Button variant="contained"  disabled={disableButton || inputAreError()} onClick={handleCreateNewTypeObject}>Создать новый тип объекта</Button>
        {AlertData.show && <Alert severity={AlertData.type}>{AlertData.text}</Alert>}
      </form>
    </UiPopup>
  )
}
