import { forwardRef, useState } from "react";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions";
import { SupplierService } from "../../services/supplier.service";
import { useNavigate } from "react-router-dom";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<unknown, string>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

type Props = {
    supplierId: number;
    open: boolean;
    handleClose(): void;
}

export const ConfirmationDialog: React.FC<Props> = ({ supplierId, open, handleClose }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const navigate = useNavigate()
    
    const handleAgree = async () => {
        setIsLoading(true)

        const supplierService = new SupplierService()

        await supplierService.deleteSupplier(supplierId);

        setIsLoading(false)
        handleClose()
        navigate('/')
    }

    return (
        <>
            <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Excluir Forecedor"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Voçê tem certeza que deseja excluir este fornecedor?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                color="success"
                sx={{ textTransform: 'capitalize' }}
                onClick={handleClose}
                >
                    Cancelar
                </Button>
            <Button
                color="error"
                sx={{ textTransform: 'capitalize' }}
                onClick={handleAgree}
                >
                    {
                        isLoading ? <CircularProgress size={18} color="inherit"/> : 'Excluir'
                    }
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}