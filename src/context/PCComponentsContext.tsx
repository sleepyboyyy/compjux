import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ComponentKey = 'cpu' | 'gpu' | 'ram' | 'storage' | 'psu' | 'case' | 'cooling_system' | 'motherboard';

interface PCComponentsContextProps {
    selectedComponents: Record<ComponentKey, any>;
    onUpdateComponent: (componentType: ComponentKey, selectedItem: any) => void;
    resetComponents: () => void;
}

const PCComponentsContext = createContext<PCComponentsContextProps | undefined>(undefined);

interface PCComponentsProviderProps {
    children: ReactNode;
}

export const PCComponentsProvider = ({ children }: PCComponentsProviderProps) => {
    const [selectedComponents, setSelectedComponents] = useState<Record<ComponentKey, any>>({
        cpu: null,
        gpu: null,
        ram: null,
        storage: null,
        psu: null,
        case: null,
        cooling_system: null,
        motherboard: null,
    });

    const onUpdateComponent = (componentType: ComponentKey, selectedItem: any) => {
        setSelectedComponents((prevComponents) => ({
            ...prevComponents,
            [componentType]: selectedItem,
        }));
    };

    const resetComponents = () => {
        setSelectedComponents({
            cpu: null,
            gpu: null,
            ram: null,
            storage: null,
            psu: null,
            case: null,
            cooling_system: null,
            motherboard: null,
        });
    };

    return (
        <PCComponentsContext.Provider value={{ selectedComponents, onUpdateComponent, resetComponents }}>
            {children}
        </PCComponentsContext.Provider>
    );
};

export const usePCComponentsContext = () => {
    const context = useContext(PCComponentsContext);
    if (!context) {
        throw new Error('usePCComponentsContext must be used within a PCComponentsProvider');
    }
    return context;
};