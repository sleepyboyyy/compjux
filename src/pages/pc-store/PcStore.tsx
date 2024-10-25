import {Box} from "@mui/material";
import PcStoreBannerSection from "../../components/PcStoreBannerSection";
import PcStoreProductsSection from "../../components/PcStoreProductsSection";

function PcStore() {
    return (
        <Box>
            <PcStoreBannerSection />
            <PcStoreProductsSection />
        </Box>
    );
}

export default PcStore;