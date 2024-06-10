import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material"
import { Supplier, SupplierCategory } from "../../models"
import { useNavigate } from "react-router-dom"

type Prop = {
    supplier: Supplier
}

export const SupplierCard = ({ supplier }: Prop) => {
    const navigate = useNavigate();

    const handleSeeMore = () => {
        navigate(`/fornecedor/${supplier.id}`)
    }
    return (
    <Card sx={{
        minWidth: 275,
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
        }}>
        <CardMedia
            sx={{ minHeight: 80 }}
            image="https://plus.unsplash.com/premium_photo-1661932015882-c35eee885897?q=80&w=1906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="green iguana"
        />
        <Avatar
            alt="Remy Sharp"
            src="https://plus.unsplash.com/premium_vector-1682305614044-9802fc1f0edd?bg=FFFFFF&q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            sx={{ position: 'relative', top: -20, left: 20, width: 60, height: 60 }}
        />

        <CardContent sx={{ margin: 0, padding: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
            {supplier.name}
            </Typography>
            <Typography gutterBottom variant="body1" color="text.secondary" component="div">
            {supplier.fullAddress}
            </Typography>
            <div style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                lineClamp: 2,
                WebkitBoxOrient: 'vertical'
            }}
            >
                <Typography variant="body1" color="text.secondary">
                {supplier.description}
                </Typography>
            </div>
        </CardContent>
        <CardContent sx={{ margin: 0, padding: 1 }}>
            <Chip label={SupplierCategory[supplier.category as never]}/>
        </CardContent>
        <CardActions>
            <Button
            size="small"
            color="inherit"
            fullWidth
            sx={{ 
                textTransform: 'capitalize',
                color: 'var(--title-color)',
            }}
                variant="outlined"
                onClick={handleSeeMore}
                >
                    Ver mais
            </Button>
        </CardActions>
    </Card>
)}