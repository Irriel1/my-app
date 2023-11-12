import Header from "../Components/Header";
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ShoppingStones from "../Components/ShoppingStones";
import ListCreateModal from "../Components/ListCreateModal";


export default function ShoppingLists() {
    const [newShoppingList, setNewShoppingList] = useState(null);
  
    const handleCreateList = (newList) => {
      setNewShoppingList(newList);
    };

  return (   
    <div>
      <Header />
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <ListCreateModal onCreate={handleCreateList} />
            <ShoppingStones newShoppingList={newShoppingList} />
          </Grid>
        </Grid>
      </Container>
    </div> 
  );
}