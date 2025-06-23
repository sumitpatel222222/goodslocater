import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone } from 'lucide-react';
import Card, { CardBody } from '../ui/Card';
import Badge from '../ui/Badge';

interface StoreCardProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  openingHours: string;
  distance?: number;
  productCount?: number;
}

const StoreCard: React.FC<StoreCardProps> = ({
  id,
  name,
  address,
  phone,
  openingHours,
  distance,
  productCount,
}) => {
  return (
    <Link to={`/stores/${id}`}>
      <Card hoverEffect className="h-full">
        <CardBody className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            {distance !== undefined && (
              <Badge variant="info" size="sm">
                {distance} km
              </Badge>
            )}
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-start text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
              <span>{address}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 text-gray-500 mr-2" />
              <span>{phone}</span>
            </div>
            
            <div className="flex items-start text-sm text-gray-600">
              <Clock className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
              <span>{openingHours}</span>
            </div>
          </div>
          
          {productCount !== undefined && (
            <div className="border-t pt-3">
              <span className="text-sm font-medium">
                {productCount > 0 
                  ? `${productCount} product${productCount !== 1 ? 's' : ''} available` 
                  : 'No products available'}
              </span>
            </div>
          )}
        </CardBody>
      </Card>
    </Link>
  );
};

export default StoreCard;