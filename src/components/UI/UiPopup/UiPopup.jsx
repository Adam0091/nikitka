import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  maxWidth: "800px",
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4
};

export const UiPopup = ({open, setOpen, children}) => {
  const handleClose = () => {
    setOpen(open => !open)
  }

  return (
    <Modal open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  )
}
