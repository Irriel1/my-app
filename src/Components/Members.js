import React, { useState } from 'react';
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Button, Typography, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MembersList = () => {
  const [members, setMembers] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jimmy Hendrix' },
    { id: 3, name: 'Bob Smith' }
  ]);

  const [newMemberName, setNewMemberName] = useState('');

  const handleAddMember = () => {
    if (newMemberName.length >= 2) {
      const newMember = { id: Date.now(), name: newMemberName };
      setMembers([...members, newMember]);
      setNewMemberName('');
    } else {
      alert('Member name must have at least two letters.');
    }
  };

  const handleRemoveMember = (id) => {
    const updatedMembers = members.filter(member => member.id !== id);
    setMembers(updatedMembers);
  };

  const handleLeave = () => {
    // Implement leave logic here (e.g., redirect to a different page)
    alert('You have left the list.');
  };

  return (
    <Box>
      <Typography variant="h6" align="center">Členové nákupního seznamu</Typography>
      <List>
        {members.map((member) => (
          <ListItem key={member.id}>
            <ListItemAvatar>
              <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText primary={member.name} />
            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveMember(member.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <TextField
        label="New Member Name"
        variant="outlined"
        fullWidth
        value={newMemberName}
        onChange={(e) => setNewMemberName(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button variant="contained" onClick={handleAddMember} sx={{ margin: "5%" }}>
        Add Member
      </Button>
      <Button variant="contained" onClick={handleLeave}>
        Leave
      </Button>
    </Box>
  );
};

export default MembersList;
