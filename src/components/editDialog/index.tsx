/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, ReactNode, useState } from "react";
import { Button, Card, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import { Supplier, SupplierCategory } from "../../models";
import { SupplierService } from "../../services/supplier.service";
import useYupValidationResolver from "../../helpers/yupValidationResolver";

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


type Props = {
    supplierId: number;
    supplier: Supplier;
    open: boolean;
    handleClose(): void;
}

export const EditDialog: React.FC<Props> = ({ handleClose, open, supplierId, supplier }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: useYupValidationResolver(schema),
        defaultValues: {
            name: supplier.name,
            description: supplier.description,
            category: supplier.category,
            fullAddress: supplier.fullAddress,
            phoneNumber: supplier.phoneNumber,
            email: supplier.email
        }
    })

    const onSubmit = async (data: Supplier) => {
        setIsLoading(true)

        const supplierService = new SupplierService()

        await supplierService.updateSupplier(supplierId, data);

        setIsLoading(false)
        handleClose()
        window.location.reload();
    }

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(onSubmit)
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
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
                                          { Object.entries(SupplierCategory).map(item => (
                                            <MenuItem key={item[0]} value={item[0]}>{ item[1] }</MenuItem>
                                          ))  }
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
                        </Card>
                        </Grid>
                    </div>
        </DialogContent>
        <DialogActions>
            <Button
                color="error"
                sx={{ textTransform: 'capitalize' }}
                onClick={handleClose}
                >
                    Cancelar
            </Button>
            <Button
                type="submit"
                sx={{ textTransform: 'capitalize', color: 'var(--title-color)' }}
                >
                    {
                        isLoading ? <CircularProgress size={18} color="inherit"/> : 'Salvar'
                    }
            </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
    )
}