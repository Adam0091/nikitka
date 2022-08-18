import {UiPopup} from './../../UI/UiPopup';
import {
  TextField,
  TextareaAutosize,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Button,
  Autocomplete,
  FormGroup,
  Checkbox
} from '@mui/material';
import {TYPE_OBJECT, TYPE_ROLE} from './../../../constants';

export const FormObject = ({isOpen, setIsOpen}) => {
  return (
    <UiPopup open={isOpen}
      setOpen={setIsOpen}>
      <FormControl>
        <TextField id="outlined-basic" label="Название" variant="outlined"/>
        <TextField id="outlined-basic" label="Url на изображение" variant="outlined"/>
        <TextField id="outlined-basic" label="Номер этажа" variant="outlined"/>
        <TextField id="outlined-basic" label="Номер комнаты" variant="outlined"/>

        <Autocomplete disablePortal
          options={TYPE_OBJECT}
          sx={
            {width: 300}
          }
          renderInput={
            (params) => <TextField {...params} label="Типы объекта "/>}/>

        <Autocomplete disablePortal
          options={
            []
          }
          sx={
            {width: 300}
          }
          renderInput={
            (params) => <TextField {...params} label="Выбор здания "/>}/>

        <TextareaAutosize aria-label="minimum height"
          minRows={3}
          placeholder="Описание"
          style={
            {
              width: "100%",
              height: "100px"
            }
          }/>
        <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
        <FormGroup> {
          TYPE_ROLE.map(type => (
            <FormControlLabel control={<Checkbox/>}
              label={type}/>
          ))
        } </FormGroup>

        <Button
          variant="contained">Создать новый объект</Button>
      </FormControl>
    </UiPopup>
  )
}
