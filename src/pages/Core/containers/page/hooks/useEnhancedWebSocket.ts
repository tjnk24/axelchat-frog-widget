import {
    browserName,
    fullBrowserVersion,
    isMobile,
    mobileModel,
    mobileVendor,
    osName,
    osVersion,
} from 'react-device-detect';
import {useSearchParams} from 'react-router-dom';
import useWebSocket from 'react-use-websocket';

import {ProtocolMessageTypeEnum} from '__utils/types';

import packageJson from '../../../../../../package.json';
import {getDeviceType} from '../utils/getDeviceType';
import {getEventLogging} from '../utils/getEventLogging';
import {getWebSocketUrl} from '../utils/getWebsocketUrl';

export const useEnhancedWebSocket = () => {
    const [searchParams] = useSearchParams();

    const isEventLogging = getEventLogging(searchParams);

    const {sendMessage, ...dataRest} = useWebSocket(getWebSocketUrl(searchParams), {
        onOpen: () => {
            // eslint-disable-next-line no-console
            isEventLogging && console.log('Opened socket');

            sendMessage(JSON.stringify({
                type: ProtocolMessageTypeEnum.Hello,
                data: {
                    client: {
                        type: 'MAIN_WEBSOCKETCLIENT',
                        name: packageJson.name,
                        version: packageJson.version,
                        device: {
                            type: getDeviceType(),
                            name: isMobile ? `${mobileVendor}, ${mobileModel}` : '',
                            os: {
                                name: osName,
                                version: osVersion,
                            },
                            browser: {
                                name: browserName,
                                version: fullBrowserVersion,
                            },
                        },
                    },
                    info: {
                        type: 'WIDGET',
                        name: searchParams.get('widget'),
                    },
                },
            }));
        },
        shouldReconnect: () => true,
    });

    return {sendMessage, ...dataRest};
};
