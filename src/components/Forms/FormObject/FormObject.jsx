import {UiPopup} from './../../UI/UiPopup';
import {
  TextField,
  TextareaAutosize,
  FormControlLabel,
  Button,
  Autocomplete,
  Alert,
  FormGroup,
  Checkbox
} from '@mui/material';
import { useState } from 'react';
import { sendData } from '../../../utils/network';
import { OBJECTS_URL } from '../../../constants';

import styles from './FormObject.module.scss'


export const FormObject = ({isOpen, setIsOpen, campus, types, roles, updatePage}) => {

  const [rulesObj, setRulesObj] = useState(roles.reduce((newObj, item) => {
    newObj[item] = false;
    return newObj;
  }, {}))

  const [objectBody, setObjectBody] = useState({
    name: '',
    images: '',
    floor: '',
    room: '',
    object: '',
    type: '',
    campus: '',
    description: '',
  })

  const [AlertData, setAlertData] = useState({
    text: '',
    type: '',
    show: false,
  })

  const [disableButton, setDisableButton] = useState(false)

  const handleCreateObject = async () => {
    let arrRolesIndex = [];

    roles.forEach((role, index) => {
      if(rulesObj[role])
        arrRolesIndex.push(index + 1);
    })

    setDisableButton(true);
    const res = await sendData(OBJECTS_URL, {
        ...objectBody,
        type: Number(types.indexOf(objectBody.type) + 1),
        campus: Number(campus.indexOf(objectBody.campus) + 1),
        floor: Number(objectBody.floor),
        room: Number(objectBody.room),
        active: true,
        roles: arrRolesIndex
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
        setObjectBody({
          name: '',
          images: '',
          floor: '',
          room: '',
          object: '',
          type: '',
          campus: '',
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

  const handleOnChangeInput = (event, type) => {

    console.log(rulesObj)
    if(type === 'name') {
      setObjectBody((object)=> ({...object, name: event.target.value}))
    }
    if(type === 'images') {
      setObjectBody((object)=> ({...object, images: event.target.value}))
    }
    if(type === 'floor') {
      setObjectBody((object)=> ({...object, floor: event.target.value}))
    }
    if(type === 'room') {
      setObjectBody((object)=> ({...object, room: event.target.value}))
    }
    if(type === 'description') {
      setObjectBody((object)=> ({...object, description: event.target.value}))
    }
  }

  const handleOnChangeSelecter = (value, type) => {
    if(type === 'campus') {
      setObjectBody((prevObject)=> ({...prevObject, campus: value}))
    }
    if(type === 'type') {
      setObjectBody((prevObject)=> ({...prevObject, type: value}))
    }
  }

  const handleChangeCheckbox = (event, role) => {
    const value = event.target.checked;
    console.log(value)
    setRulesObj(prev => ({...prev, [role]: value}))
  }

  const inputAreError = () => {
    let arrRolesIndex = [];

    roles.forEach((role, index) => {
      if(rulesObj[role])
        arrRolesIndex.push(index);
    })

    return !objectBody.name.length
        // || !objectBody.images.length
        || !objectBody.floor
        || !objectBody.room
        || !objectBody.campus
        || arrRolesIndex.length === 0;
  }

  return (<UiPopup open={isOpen}
    setOpen={setIsOpen}>
    <form className={styles.form_object}>
      <span>Создание нового объекта</span>

      <div className={styles.form_object__inputs}>
        <TextField label="Название" variant="outlined" type="text" 
          required 
          error={!objectBody.name.length}
          sx={{width: "100%"}}
          value={objectBody.name}
          onChange={ (event) => handleOnChangeInput(event, 'name') }/>
        {/* <TextField label="Url на изображение" variant="outlined" type="text" 
          required 
          sx={{width: "100%"}}
          error={!objectBody.images.length}
          value={objectBody.images}
          onChange={ (event) => handleOnChangeInput(event, 'images') }/> */}

        <div className={styles.form_object__inputs_numbers}>
          <TextField label="Номер этажа" variant="outlined" type="number"
            required 
            sx={{width: "50%"}}
            error={!objectBody.floor}
            value={objectBody.floor}
            onChange={ (event) => handleOnChangeInput(event, 'floor') }/>
          <TextField label="Номер комнаты" variant="outlined" type="number"
            sx={{width: "50%"}}
            error={!objectBody.room}
            value={objectBody.room}
            onChange={ (event) => handleOnChangeInput(event, 'room') }/>
        </div> 
      </div>

      <div className={styles.form_object__selects}>
        <Autocomplete disablePortal
          options={campus}
          sx={{width: "100%"}}
          defaultValue={campus[0]}
          inputValue={objectBody.campus}
          onInputChange={(event, newInputValue) => handleOnChangeSelecter(newInputValue, 'campus')}
          renderInput={(params) => <TextField {...params} error={!objectBody.campus} label="Выбор кампуса "/>}
        />
        <Autocomplete disablePortal
          options={types}
          sx={{width: "100%"}}
          defaultValue={types[0]}
          inputValue={objectBody.type}
          onInputChange={(event, newInputValue) => handleOnChangeSelecter(newInputValue, 'type')}
          renderInput={(params) => <TextField {...params} error={!objectBody.type} label="Выбор типа здания"/>}
        />
      </div>

      <FormGroup className={styles.form_object__checkboxs}> 
          {
            roles.map(role => (
              <FormControlLabel
                key={role} 
                checked={rulesObj[role]}
                onChange={(event)=> handleChangeCheckbox(event, role)}
                name={role}
                control={<Checkbox/>}
                label={role}
              />
            ))
          } 
        </FormGroup>

      

      <div className={styles.form_object__textarea}>
        <TextareaAutosize aria-label="minimum height"
          value={objectBody.description}
          onChange={(event)=>handleOnChangeInput(event, 'description')}
          minRows={3}
          placeholder="Описание"
          style={{width: "99%",height: "100px"}}
        />
      </div>

      <Button onClick={handleCreateObject} disabled={disableButton || inputAreError()} variant="contained">Создать новый объект</Button>

      {AlertData.show && <Alert severity={AlertData.type}>{AlertData.text}</Alert>}
    </form> 
  </UiPopup>
  )
  }
