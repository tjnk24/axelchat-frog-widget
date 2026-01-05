import {ServiceDto} from '__utils/types';

export type AppStateDto = {
    viewers: number;
}

interface OwnProps {
    services: ServiceDto[];
    appState: AppStateDto;
    hidePlatformIconIfCountIsUnknown?: boolean;
}

export type Props = OwnProps;
