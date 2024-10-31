import {Box} from "@mui/material";
import PcStoreBannerSection from "../../components/PcStoreBannerSection";
import PcStoreProductsSection from "../../components/PcStoreProductsSection";
import FooterSection from "../../components/FooterSection";
import CopyrightSection from "../../components/CopyrightSection";

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