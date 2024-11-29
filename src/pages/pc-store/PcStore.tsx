import {Box} from "@mui/material";
import PcStoreBannerSection from "../../components/pc-store-components/PcStoreBannerSection";
import PcStoreProductsSection from "../../components/pc-store-components/PcStoreProductsSection";
import FooterSection from "../../components/home-components/FooterSection";
import CopyrightSection from "../../components/home-components/CopyrightSection";

function PcStore() {
    return (
        <Box>
            <PcStoreBannerSection />
            <PcStoreProductsSection />
            <FooterSection />
            <CopyrightSection />
        </Box>
    );
}

export default PcStore;