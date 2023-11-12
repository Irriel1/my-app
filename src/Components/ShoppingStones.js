import { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import ShoppingStone from './ShoppingStone';
import ListFilter from './ListFilter';
import ListCreateModal from './ListCreateModal';

const ShoppingStones = ({ newShoppingList }) => {
  const [activeLists, setActiveLists] = useState([
    { id: 1, name: 'List 1', owner: 'John Doe' },
    { id: 2, name: 'List 2', owner: 'Jane Doe' },
    { id: 3, name: 'List 3', owner: 'John Brick' },
    { id: 4, name: 'List 4', owner: 'Jane Brick' },
    { id: 5, name: 'List 5', owner: 'John Doe' },
    { id: 6, name: 'List 6', owner: 'Jane Doe' },
    { id: 7, name: 'List 7', owner: 'John Brick' },
    { id: 8, name: 'List 8', owner: 'Jane Brick' },
  ]);

  const [archivedLists, setArchivedLists] = useState([]);
  const [filterOption, setFilterOption] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleArchive = (listId) => {
    const listToArchive = activeLists.find((list) => list.id === listId);

    if (listToArchive) {
      setActiveLists(activeLists.filter((list) => list.id !== listId));
      setArchivedLists([...archivedLists, listToArchive]);
    }
  };

  const handleDelete = (listId) => {
    setActiveLists(activeLists.filter((list) => list.id !== listId));
    setArchivedLists(archivedLists.filter((list) => list.id !== listId));
  };

  const handleRestore = (listId) => {
    const listToRestore = archivedLists.find((list) => list.id === listId);

    if (listToRestore) {
      setArchivedLists(archivedLists.filter((list) => list.id !== listId));
      setActiveLists([...activeLists, listToRestore]);
    }
  };

  const getFilteredLists = () => {
    switch (filterOption) {
      case 'active':
        return activeLists;
      case 'archived':
        return archivedLists;
      default:
        return [...activeLists, ...archivedLists];
    }
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const filteredLists = getFilteredLists();

  const confirmDelete = (listId, listName) => {
    const confirmMessage = `Opravdu chcete smazat "${listName}"?`;
    // is User author? implementace logiky Auth0 až v příštím úkolu
    if (window.confirm(confirmMessage)) {
      handleDelete(listId);
    }
  };
  
  const handleCreateList = (newListData) => {
    // Find the next available ID
    const nextId = Math.max(...activeLists.map(list => list.id), ...archivedLists.map(list => list.id), 0) + 1;

    const newList = { id: nextId, ...newListData };

    setActiveLists([...activeLists, newList]);
    setIsModalOpen(false);

    // Store the new list in local storage
    localStorage.setItem('shoppingLists', JSON.stringify([...activeLists, newList]));
  };

  return (
    <div>
      <Box sx={{ minWidth: 120, margin: 2, alignItems: 'center' }}>
        <ListFilter filterOption={filterOption} onFilterChange={handleFilterChange} />

        {filterOption !== 'archived' && (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              Aktivní nákupní seznamy
            </Typography>
            <Grid container spacing={2}>
              {activeLists.map((list) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={list.id}>
                  <ShoppingStone
                    shoppingList={newShoppingList && newShoppingList.id ? newShoppingList : list}
                    onDelete={() => confirmDelete(list.id, list.name)}
                    onArchive={() => handleArchive(list.id)}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {filterOption !== 'active' && (
          <>
            <Typography variant="h4" align="center" gutterBottom margin={2}>
              Archivované nákupní seznamy
            </Typography>
            <Grid container spacing={2}>
              {archivedLists.map((list) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={list.id}>
                  <ShoppingStone
                    shoppingList={list}
                    onDelete={() => confirmDelete(list.id, list.name)} 
                    onRestore={() => handleRestore(list.id)}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
      <ListCreateModal open={isModalOpen} onClose={handleCloseModal} onCreate={handleCreateList} />
      <Button onClick={handleOpenModal} variant="contained" color="primary" sx={{ margin: 2 }}>Vytvoř nákupní seznam</Button>
    </div>
  );
};

export default ShoppingStones;
