import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { ReactNode, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup';
import Navbar from "../../components/navbar";
import { ArrowBack, Save } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Supplier } from "../../models";
import { SupplierService } from "../../services/supplier.service";

const useYupValidationResolver = (validationSchema) =>
    useCallback(
      async (data) => {
        try {
          const values = await validationSchema.validate(data, {
            abortEarly: false,
          })
  
          return {
            values,
            errors: {},
          }
        } catch (errors) {
          return {
            values: {},
            errors: errors.inner.reduce(
              (allErrors, currentError) => ({
                ...allErrors,
                [currentError.path]: {
                  type: currentError.type ?? "validation",
                  message: currentError.message,
                },
              }),
              {}
            ),
          }
        }
      },
      [validationSchema]
    )

const schema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    description: yup.string().required('Descrição é obrigatório'),
    category: yup.string().required('Categoria é obrigatório'),
    fullAddress: yup.string().required('Endereço completo é obrigatório'),
    phoneNumber: yup.string()
    .matches(RegExp(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/), { message: 'Número de telefone inválido' })
    .required('Número de telefone é obrigatório'),
    email: yup.string().email().required('Email é obrigatório'),
  });

export const NewSupplier = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: useYupValidationResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            category: '',
            fullAddress: '',
            phoneNumber: '',
            email: ''
        }
    })
    
    const navigate = useNavigate();
    
    const onSubmit = async (data: Supplier) => {
        setIsLoading(true)
        const supplierService = new SupplierService()
        await supplierService.createSupplier(data);

        setIsLoading(false)
        navigate('/')        
    }

    return (
        <div>
            <Navbar/>
            <Container maxWidth='lg'>
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
                <Typography variant="h5" component="div" gutterBottom>
                    Novo Fornecedor
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card
                        sx={{
                            minWidth: 275,
                            minHeight: 200,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            }}
                    >
                        <CardMedia
                        sx={{ minHeight: 200 }}
                        image="https://plus.unsplash.com/premium_photo-1661932015882-c35eee885897?q=80&w=1906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        title="green iguana"
                    />
                    </Card>

                    <div>
                        <Grid item xs={12} sm={8} md={6}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                            
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Nome"
                                        variant="outlined"
                                        fullWidth
                                        value={field.value || ''}
                                        sx={{ marginTop: 2 }}
                                        error={!!errors.name}
                                        helperText={errors.name?.message as ReactNode}
                                    />
                                    )}
                                />
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Descrição"
                                        variant="outlined"
                                        fullWidth
                                        value={field.value || ''}
                                        sx={{ marginTop: 2 }}
                                        error={!!errors.description}
                                        helperText={errors.description?.message as ReactNode}
                                    />
                                    )}
                                />
                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl fullWidth variant="outlined" error={!!errors.category} sx={{ marginTop: 2 }}>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                          {...field}
                                          label="Category"
                                          value={field.value || ''}
                                        >
                                          <MenuItem value="Categoria 1">Categoria 1</MenuItem>
                                          <MenuItem value="Categoria 2">Categoria 2</MenuItem>
                                          <MenuItem value="Categoria 3">Categoria 3</MenuItem>
                                        </Select>
                                        {errors.category && <Typography variant="body2" color="error">{errors.category.message as ReactNode}</Typography>}
                                      </FormControl>
                                    )} 
                                />
                                <Controller
                                    name="fullAddress"
                                    control={control}
                                    render={({ field }) => (
                                    <TextField
                                        {...field}
                                        value={field.value || ''}
                                        label="Endereço"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ marginTop: 2 }}
                                        minRows={3}
                                        error={!!errors.fullAddress}
                                        helperText={errors.fullAddress?.message as ReactNode}
                                    />
                                    )}
                                />
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    render={({ field }) => (
                                    <TextField
                                        {...field}
                                        value={field.value || ''}
                                        label="Telefone"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ marginTop: 2 }}
                                        minRows={3}
                                        error={!!errors.phoneNumber}
                                        helperText={errors.phoneNumber?.message as ReactNode}
                                    />
                                    )}
                                />
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                    <TextField
                                        {...field}
                                        value={field.value || ''}
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ marginTop: 2 }}
                                        minRows={3}
                                        error={!!errors.email}
                                        helperText={errors.email?.message as ReactNode}
                                    />
                                    )}
                                />
                            </CardContent>
                            <CardContent>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    color="inherit"
                                    startIcon={
                                    !isLoading ? <Save/> : <CircularProgress color="inherit" size={20} />
                                    }
                                    sx={{
                                        textTransform: 'capitalize',
                                        color: 'var(--title-color)',
                                    }}
                                    >
                                        Criar
                                    </Button>
                            </CardContent>
                        </Card>
                        </Grid>
                    </div>
                </form>
            </Container>
        </div>
    )
}