import React from 'react';
import {Box} from "@mui/material";
import {useCollection} from "../hooks/useCollection";
import HomeBestSellingSingleCard from "./HomeBestSellingSingleCard";

import testImage from '../assets/productImages/3.webp';

function PcStoreProductsDisplay() {
    const { documents } = useCollection('products', null, "asc" );

    if (!documents) {
        return <p>Loading...</p>;
    }

    return (
        <Box
            sx={{
                width: '100%',
                margin: '0 auto',
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(3, 1fr)',
                justifyItems: 'center',
                alignItems: 'center',
            }}
        >
            {documents.map((doc: any) => (
                <HomeBestSellingSingleCard productId={doc.id} productImage={testImage} />
            ))}
        </Box>
    );
}

export default PcStoreProductsDisplay;