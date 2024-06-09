import { useEffect, useState } from "react";
import { Supplier } from "../../models"
import { SupplierService } from "../../services/supplier.service"
import Navbar from "../../components/navbar";
import { Container, Grid, InputBase, Typography, alpha, styled } from "@mui/material";
import { SupplierCard } from "../../components/supplierCard";
import SearchIcon from '@mui/icons-material/Search'


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

export const Home = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    useEffect( () => {
            const supplierService = new SupplierService();
           
            supplierService.getSuppliers()
            .then(response => {
                setSuppliers(response)
            })

    },[])

    return (
        <div className="homeContainer">
            <Navbar/>

            <Container maxWidth={"lg"} sx={{ marginBottom: 4, marginTop: 4 }}>
                <Typography variant="h6" mb={4} fontWeight={'bold'} >Fornecedores</Typography>
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Grid container spacing={3}>
                    { suppliers.map((supplier) => (
                        <Grid key={supplier.id} item xs={12} sm={6} md={4}>
                            <SupplierCard supplier={supplier} />
                        </Grid>
                    )) }
                </Grid>
            </Container>
        </div>
    )
}