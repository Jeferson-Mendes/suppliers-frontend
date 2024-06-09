import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { SupplierService } from "../../services/supplier.service";
import { Supplier } from "../../models";
import Navbar from "../../components/navbar";
import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Chip, Container, Typography } from "@mui/material";
import { ArrowBack, Delete, Edit } from "@mui/icons-material";
import { ConfirmationDialog } from "../../components/confirmationDialog";
import { EditDialog } from "../../components/editDialog";

export const SupplierDetails = () => {
    const [supplier, setSupplier] = useState<Supplier>({
        id: 0,
        name: '',
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
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        sx={{ position: 'relative', top: -20, left: 20, width: 80, height: 80 }}
                    />

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {supplier?.name}
                        </Typography>
                        <Typography gutterBottom variant="body1" color="text.secondary" component="div">
                        {supplier?.fullAddress}
                        </Typography>
                        <div>
                            <Typography variant="body1" color="text.secondary">
                            {/* {supplier?.email} */}
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Typography>
                        </div>
                    </CardContent>

                    <CardContent>
                        <Chip label={supplier?.category}/>
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