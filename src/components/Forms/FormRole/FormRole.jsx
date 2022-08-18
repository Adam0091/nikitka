import {UiPopup} from './../../UI/UiPopup';
import { FormControl, TextField, TextareaAutosize, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import { TYPE_ROLE } from '../../../constants';

export const FormRole = ({isOpen, setIsOpen}) => {
  return (
    <UiPopup open={isOpen}
      setOpen={setIsOpen}>
      <FormControl>
        <TextField label="Название роли" variant="outlined"/>
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
          TYPE_ROLE.map(type => (
            <FormControlLabel control={<Checkbox/>}
              label={type}/>
          ))
        } </FormGroup>

        <Button variant="contained">Создать новый роль</Button>
      </FormControl>
    </UiPopup>
  )
}
