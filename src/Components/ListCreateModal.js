import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const ListCreateModal = ({ open, onClose, onCreate }) => {
  const [listName, setListName] = useState('');
  const [items, setItems] = useState('');
  const [members, setMembers] = useState('');

  const handleCreate = () => {
    // Validate input fields
    if (!listName || !items || !members) {
      alert('Please fill in all fields.');
      return;
    }

    // Call the onCreate prop with the new shopping list data
    onCreate({ listName, items, members });

    // Reset state and close the modal
    setListName('');
    setItems('');
    setMembers('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create a New Shopping List</DialogTitle>
      <DialogContent>
        <TextField
          label="List Name"
          fullWidth
          margin="normal"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <TextField
          label="Items"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={items}
          onChange={(e) => setItems(e.target.value)}
        />
        <TextField
          label="Members"
          fullWidth
          margin="normal"
          value={members}
          onChange={(e) => setMembers(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreate} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ListCreateModal;
