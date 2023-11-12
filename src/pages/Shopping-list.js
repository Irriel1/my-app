import Header from "../Components/Header";
import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InteractiveList from "../Components/List";
import Members from "../Components/Members";


export default function ShoppingList () {
    return (
        <div>
            <Header />
                <Container>
                <Grid container spacing={1} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h3" align="center">Nákupní seznam</Typography>
                    </Grid>
                    <Grid item xs={8}>
                         <InteractiveList />
                     </Grid>
                    <Grid item xs={4}>
                        <Members />
                    </Grid>
                </Grid>
            </Container>


        </div>
    )
}

