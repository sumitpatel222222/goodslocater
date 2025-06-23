import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Card, { CardImage, CardBody } from '../ui/Card';
import Badge from '../ui/Badge';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  categoryName?: string;
  storeCount?: number;
  nearestStore?: string;
  nearestDistance?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  description,
  categoryName,
  storeCount,
  nearestStore,
  nearestDistance,
}) => {
  return (
    <Link to={`/products/${id}`}>
      <Card hoverEffect className="h-full">
        <CardImage 
          src={imageUrl} 
          alt={name} 
          className="h-48 md:h-56"
        />
        <CardBody className="p-4">
          <div className="flex justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{name}</h3>
            <span className="font-bold text-indigo-600">${price.toFixed(2)}</span>
          </div>
          
          {categoryName && (
            <Badge variant="primary" size="sm" className="mb-2">
              {categoryName}
            </Badge>
          )}
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
          
          {storeCount !== undefined && storeCount > 0 ? (
            <div className="flex flex-col gap-1">
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium text-green-600">Available in {storeCount} store{storeCount !== 1 ? 's' : ''}</span>
              </div>
              
              {nearestStore && nearestDistance !== undefined && (
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>
                    Nearest: {nearestStore} ({nearestDistance} km)
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              <span className="font-medium text-red-600">Currently unavailable</span>
            </div>
          )}
        </CardBody>
      </Card>
    </Link>
  );
};

export default ProductCard;