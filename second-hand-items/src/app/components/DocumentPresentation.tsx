import { Document } from '@/store/models';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const DocumentPresentation = ({ document }: { document: Document }) => {
  return (
    <Card sx={{ width: 300 }}>
      <CardMedia
        sx={{ height: 240 }}
        component="img"
        image={document.imageURI || undefined}
        alt={document.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {document.title}
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          {document.price} {document.currency}{' '}
          {document.shippingCost ? `(+ ${document.shippingCost} shipping)` : ''}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {document.isAuction ? 'Auction' : 'Buy Now'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          // size="small"
          variant="outlined"
          fullWidth
          onClick={() => window.open(document.itemURI, '_blank')}
        >
          View Item
        </Button>
      </CardActions>
    </Card>
  );
};

export default DocumentPresentation;
