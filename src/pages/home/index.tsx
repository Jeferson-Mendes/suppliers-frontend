import { useEffect, useState } from "react";
import { Supplier } from "../../models"
import { SupplierService } from "../../services/supplier.service"
import Navbar from "../../components/navbar";
import { CardActions, Container, Grid, InputBase, Pagination, Typography, alpha, styled } from "@mui/material";
import { SupplierCard } from "../../components/supplierCard";
import SearchIcon from '@mui/icons-material/Search'


const Search = styled('form')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.4),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginBottom: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
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
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [resPerPage] = useState<number>(5);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);

    useEffect(() => {
      const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300); // 300ms de debounce
        
        return () => {
          clearTimeout(handler);
          };
          }, [searchTerm]);
          
    useEffect(() => {
        const supplierService = new SupplierService();
        supplierService.getSuppliers({ page, searchTerm: debouncedSearchTerm, size: resPerPage })
            .then(response => {
                setSuppliers(response || []);
            });
    
    }, [debouncedSearchTerm, page, resPerPage]);

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
                    placeholder="Buscar…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </Search>
                <Grid container spacing={3}>
                    { !suppliers.length ? <p style={{ margin: 24 }}>Nenhum fornecedor encontrado...</p> : suppliers.map((supplier) => (
                        <Grid key={supplier.id} item xs={12} sm={6} md={4}>
                            <SupplierCard supplier={supplier} />
                        </Grid>
                    )) }
                </Grid>

                <CardActions sx={{ justifyContent: 'center' }}>
                    <Pagination count={5} onChange={(_, page) => setPage(page - 1)} />
                </CardActions>

            </Container>
        </div>
    )
}