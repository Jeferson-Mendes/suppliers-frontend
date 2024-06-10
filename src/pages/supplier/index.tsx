import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { SupplierService } from "../../services/supplier.service";
import { Supplier, SupplierCategory } from "../../models";
import Navbar from "../../components/navbar";
import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Chip, Container, Typography } from "@mui/material";
import { ArrowBack, Delete, Edit } from "@mui/icons-material";
import { ConfirmationDialog } from "../../components/confirmationDialog";
import { EditDialog } from "../../components/editDialog";

export const SupplierDetails = () => {
    const [supplier, setSupplier] = useState<Supplier>({
        id: 0,
        name: '',
        description: '',
        category: '',
        email: '',
        fullAddress: '',
        phoneNumber: ''
    });
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    
    const { id } = useParams();

    useEffect(() => {
        const supplierService = new SupplierService();

        supplierService.getSupplierById(Number(id))
        .then(response => {
            setSupplier(response)
        })
    },[id])

    const handleOpenConfirmationDialog = () => {
        setIsConfirmationDialogOpen(true);
    };

    const handleCloseConfirmationDialog = () => {
        setIsConfirmationDialogOpen(false);
    };

    const handleOpenEditDialog = () => {
        setIsEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
    };

    return (
        <div>
            <Navbar/>

            <Container maxWidth="lg" >
                <CardActions>
                    <Button
                    component={Link}
                    to='/'
                    size="small"
                    startIcon={<ArrowBack/>}
                    sx={{ 
                        textTransform: 'capitalize',
                        color: 'var(--title-color)',
                        fontWeight: 'bold'
                    }}
                        >
                            Voltar
                    </Button>
                </CardActions>

                <Card sx={{
                    minWidth: 275,
                    minHeight: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    }}>
                    <CardMedia
                        sx={{ minHeight: 200 }}
                        image="https://plus.unsplash.com/premium_photo-1661932015882-c35eee885897?q=80&w=1906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        title="green iguana"
                    />
                    <Avatar
                        alt="Remy Sharp"
                        src="https://plus.unsplash.com/premium_vector-1682305614044-9802fc1f0edd?bg=FFFFFF&q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        sx={{ position: 'relative', top: -20, left: 20, width: 80, height: 80 }}
                    />

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {supplier?.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {supplier?.description}
                        </Typography>
                        <Typography gutterBottom variant="body1" color="text.secondary" component="div">
                        {supplier?.fullAddress}
                        </Typography>
                        <div>
                            <Typography variant="body1" color="text.secondary">
                            {supplier?.email}
                            </Typography>
                        </div>
                    </CardContent>

                    <CardContent>
                        <Chip label={SupplierCategory[supplier.category as never]}/>
                    </CardContent>

                    <CardContent>
                        <Button
                        variant="outlined"
                        startIcon={ <Delete/> }
                        sx={{ 
                            textTransform: 'capitalize',
                            color: 'var(--title-color)',
                            marginRight: 2
                        }}
                        color="error"
                        onClick={handleOpenConfirmationDialog}
                        >
                            Excluir
                        </Button>
                        <ConfirmationDialog
                            open={isConfirmationDialogOpen}
                            handleClose={handleCloseConfirmationDialog}
                            supplierId={supplier?.id || 0}
                            />

                        <Button
                        variant="outlined"
                        startIcon={ <Edit/> }
                        sx={{ 
                        textTransform: 'capitalize',
                        color: 'var(--title-color)',
                        }}
                        onClick={handleOpenEditDialog}
                        >
                            Editar
                        </Button>
                        <EditDialog
                            open={isEditDialogOpen}
                            handleClose={handleCloseEditDialog}
                            supplierId={supplier.id}
                            supplier={supplier}
                        />
                        
                    </CardContent>
                    
                </Card>
            </Container>
        </div>
    )
}