import {UiPopup} from './../../UI/UiPopup';
import {
  FormControl,
  TextField,
  TextareaAutosize,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';

import {TYPE_OBJECT} from './../../../constants';
import { Button } from '@mui/material';


export const FormTypeObject = ({isOpen, setIsOpen}) => {
  return (
    <UiPopup open={isOpen}
      setOpen={setIsOpen}>
      <FormControl>
        <TextField label="Название типа объекта" variant="outlined"/>
        <TextareaAutosize aria-label="minimum height"
          minRows={3}
          placeholder="Описание"
          style={
            {
              width: "100%",
              height: "100px"
            }
          }/>
        <FormGroup> {
          TYPE_OBJECT.map(type => (
            <FormControlLabel control={<Checkbox/>}
              label={type}/>
          ))
        } </FormGroup>

        <Button variant="contained">Создать новый тип объекта</Button>
      </FormControl>
    </UiPopup>
  )
}
