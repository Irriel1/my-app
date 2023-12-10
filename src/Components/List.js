import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography, List, ListItem, ListItemText, IconButton, TextField, Button, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import BasicSelect from './BasicSelect';
import  data  from "../calls/mockData";
import { updateMockData } from "../calls/mockData";

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));

export default function InteractiveList() {

  const [items, setItems] = useState(data);
  const [newItemName, setNewItemName] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(localStorage.getItem('editedTitle') || 'Nákupní seznam č.1');
  const [filterOption, setFilterOption] = useState('all');

  
  useEffect(() => {
    setItems(data);
  }, [data]);

  const saveData = () => {
    if (data.id) {
      // Assuming you have a function to update mock data
      updateMockData(data.id, items);
      localStorage.setItem('yourDataKey', JSON.stringify(items));
      console.log('Data in InteractiveList has been saved.');
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('yourDataKey'));
    setItems(storedData || []);
  }, []);

  useEffect(() => {
    if (isEditingTitle) {
      document.getElementById('title-input').focus();
    }
  }, [isEditingTitle]);

  const handleDelete = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    if (newItemName.length >= 2) {
      const newItem = { id: Date.now(), text: newItemName };
      setItems([...items, newItem]);
      setNewItemName('');
    } else {
      alert('Item name must have at least two letters.');
    }
  };

  const handleAddItemAndSave = () => {
    handleAddItem();
    saveData();
  };

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleSaveTitle = () => {
    setIsEditingTitle(false);
    localStorage.setItem('editedTitle', editedTitle);
  };

  const handleToggleCheckbox = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleFilterChange = (selectedOption) => {
    setFilterOption(selectedOption);
  };

  const filterItems = () => {
    if (filterOption === 'checked') {
      return items.filter(item => item.checked);
    } else if (filterOption === 'unchecked') {
      return items.filter(item => !item.checked);
    }
    return items;
  };

  const filteredItems = filterItems();

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752, position: "center" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ mt: 4, mb: 2, flexGrow: 1 }}>
              {isEditingTitle ? (
                <TextField
                  label="List Title"
                  variant="outlined"
                  fullWidth
                  autoFocus
                  onBlur={handleSaveTitle}
                  id="title-input"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                editedTitle
              )}
            </Typography>
            {isEditingTitle ? (
              <IconButton onClick={handleSaveTitle}>
                <SaveIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleEditTitle}>
                <EditIcon />
              </IconButton>
            )}
          </div>
          <BasicSelect handleFilterChange={handleFilterChange} />
          <Demo>
            <List>
              {filteredItems.map(item => (
                <ListItem key={item.id}>
                  <ListItemText primary={item.text} />
                  <Checkbox
                    checked={item.checked}
                    onChange={() => handleToggleCheckbox(item.id)}
                  />
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Demo>
          <TextField
            label="New Item Name"
            variant="outlined"
            fullWidth
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" onClick={handleAddItemAndSave} sx={{ mt: 2 }}>
            Add Item
          </Button>
        </Grid>
      </Grid>
    </Box>
  )};
