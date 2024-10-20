import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import {useDocument} from "../hooks/useDocument";
import {projectFirestore} from "../firebase/firebase";

type HomeBestSellingSingleCardProps = {
    productId: string;
    productImage: string;
};

function HomeBestSellingSingleCard({ productId, productImage }: HomeBestSellingSingleCardProps) {
    const { document: productDocument } = useDocument('products', productId);
    const [componentsData, setComponentsData] = useState<null | any>({
        cpu: null,
        gpu: null,
        ram: null,
        storage: null,
    });

    useEffect(() => {
        const fetchComponentData = async () => {
            if (productDocument) {
                try {
                    const componentKeys = ['cpu', 'gpu', 'ram', 'storage'];
                    const fetchedData: any = {};

                    for (const key of componentKeys) {
                        const componentRef = doc(projectFirestore, key, productDocument[key]);
                        const componentSnap = await getDoc(componentRef);
                        if (componentSnap.exists()) {
                            fetchedData[key] = componentSnap.data();
                        }
                    }

                    setComponentsData(fetchedData);
                } catch (error) {
                    console.error('Error fetching component data: ', error);
                }
            }
        };

        fetchComponentData();
    }, [productDocument]);

    if (!productDocument || !componentsData.cpu || !componentsData.gpu || !componentsData.ram || !componentsData.storage) {
        return <p>Loading...</p>;
    }

    return (
        <Card sx={{ width: {xs: '300px', sm: '345px'}, m: 2, boxShadow: 3, '&:hover': {boxShadow: 12} }}>
            <CardMedia
                component="img"
                height="400"
                image={productImage}
                alt={productDocument.product_name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ color: 'var(--primary-color)', fontWeight: '600' }}>
                    {productDocument.product_name}
                </Typography>
                <Box sx={{ height: '180px' }}>
                    <Typography variant="body2" sx={{ color: 'var(--secondary-color)', fontSize: '14px' }}>
                        <strong>CPU:</strong> {componentsData.cpu.model}, {componentsData.cpu.core_clock_speed.base} - {componentsData.cpu.core_clock_speed.boost} GHz
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--secondary-color)', fontSize: '14px' }}>
                        <strong>GPU:</strong> {componentsData.gpu.brand} {componentsData.gpu.model}, {componentsData.gpu.memory.size} {componentsData.gpu.memory.type}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--secondary-color)', fontSize: '14px' }}>
                        <strong>RAM:</strong> {componentsData.ram.brand} {componentsData.ram.model}, {componentsData.ram.capacity.total_capacity}, {componentsData.ram.speed.base} - {componentsData.ram.speed.max} MHz
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--secondary-color)', fontSize: '14px' }}>
                        <strong>Storage:</strong> {componentsData.storage.brand} {componentsData.storage.model}, {componentsData.storage.capacity}, {componentsData.storage.type}
                    </Typography>
                </Box>
                <Typography variant="h6" sx={{ color: 'var(--priceGreen-color)' }}>
                    ${productDocument.total_price}
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        mt: 1,
                        px: 3,
                        fontWeight: 'bold',
                        color: 'var(--primary-color)',
                        border: '3px solid var(--primary-color)',
                        borderRadius: '24px',
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: 'var(--primary-color)',
                            color: 'var(--softWhite-color)',
                        }
                    }}
                >
                    Buy
                </Button>
            </CardContent>
        </Card>
    );
}

export default HomeBestSellingSingleCard;