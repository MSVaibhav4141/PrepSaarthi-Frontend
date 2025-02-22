import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const options = ['1 month', '2 month', '3 month'];

export default function SplitButton() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorEl && anchorEl.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        aria-label="Button group with a nested menu"
        sx={{
          display: 'flex',
          '& .MuiButton-root:first-of-type': {
            flexGrow: 1, // Make the main button take more space
            fontSize: '1vmax', // Adjust font size for responsiveness
            width: '20vmax',
            height: '3.5vmax'
          },
          '& .MuiButton-root:last-of-type': {
            flexGrow: 0.3, // Allocate smaller space to the arrow button
            padding: 0, // Remove padding for a compact look
            width: '4.5vmax', // Match height for visual alignment

          },
        }}
      >
        <Button onClick={handleClick}>PAy {options[selectedIndex]}</Button>
        <Button
          aria-controls={openBtn ? 'split-button-menu' : undefined}
          aria-expanded={openBtn ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon fontSize="small" />
        </Button>
      </ButtonGroup>
      <Menu
        anchorEl={anchorEl}
        open={openBtn}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            maxHeight: 250,
            width: '20ch',
            marginLeft: 10,
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
