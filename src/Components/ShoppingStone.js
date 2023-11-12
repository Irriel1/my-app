import { Card, CardContent, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import RestoreIcon from '@mui/icons-material/Restore';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ShoppingStone = ({ shoppingList, onArchive, onDelete, onRestore }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const { id } = shoppingList;
    navigate(`/shopping-list/${id}`);
  };

  return (
    <Card sx={{ display: "flex", minWidth: 275, gridColumnStart: "auto", marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ textAlign: "justify" }}>{shoppingList.name}</Typography>
        <Typography variant="subtitle1">Owner: {shoppingList.owner}</Typography>
        {onArchive && (
          <Button variant="contained" color="primary" onClick={onArchive} sx={{ marginRight: 1 }}>
            <ArchiveIcon />
          </Button>
        )}
        {onRestore && (
          <Button variant="contained" color="primary" onClick={onRestore} sx={{ marginRight: 1 }}>
            <RestoreIcon />
          </Button>
        )}
        {onDelete && (
          <Button variant="contained" color="error" onClick={onDelete} sx={{ marginRight: 1 }}>
            <DeleteIcon />
          </Button>
        )}
        <VisibilityIcon variant="contained" color="success" onClick={handleCardClick} />
      </CardContent>
    </Card>
  );
};

export default ShoppingStone;



      {/*const { user, isAuthenticated } = useAuth0();

    const handleDelete = () => {
    if (isAuthenticated && user.sub === shoppingList.ownerId) {
      onDelete();
    } else {
      alert('You are not allowed to delete this list.');
    }
  };
// Řešení autentifikace uživatele a jeho oprávnění k mazání seznamu bude implementováno až v následujícím úkolu.
*/}