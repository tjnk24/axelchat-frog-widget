import isEmpty from 'lodash/isEmpty';

import {
    appStateAuthorsSelector,
    appStateMessagesSelector,
    appStateSelector,
} from '__selectors/appStateSelectors';
import {commonActions} from '__store/actions';
import {getStore} from '__store/configureStore';
import {MAX_MESSAGES_COUNT} from '__utils/consts';
import {
    AuthorDto,
    MessageDto,
    ProtocolMessageAuthorValuesChangedData,
} from '__utils/types';

class AppService {
    public onNewMessages = (messages: MessageDto[]) => {
        const store = getStore();

        const appState = appStateSelector(store);

        const newMessages: MessageDto[] = [...appState.messages, ...messages];
        const newAuthors: AuthorDto[] = [...appState.authors, ...messages.map(({author}) => author)];

        const newMessagesCount = newMessages.length;

        if (newMessagesCount > MAX_MESSAGES_COUNT) {
            const needToDeleteCount = newMessagesCount - MAX_MESSAGES_COUNT;

            newMessages.splice(0, needToDeleteCount);
        }

        commonActions.appState.setNewMessagesCount(messages.length);
        commonActions.appState.setAuthors(newAuthors);
        commonActions.appState.setMessages(newMessages);
    };

    public onSelectedMessages = (messages: MessageDto[]) => {
        const authors = appStateAuthorsSelector(getStore());

        const newAuthors: AuthorDto[] = [...authors, ...messages.map(({author}) => author)];

        commonActions.appState.setAuthors(newAuthors);
        commonActions.appState.setSelectedMessages(messages);
    };

    public onMessagesChanged = (messages: MessageDto[], isEventLogging: boolean) => {
        const oldMessages = appStateMessagesSelector(getStore());

        const changedMessages = messages.map(message => {
            const prevMessage = oldMessages.find(({id}) => id === message.id);

            if (!isEmpty(prevMessage)) {
                // eslint-disable-next-line no-console
                isEventLogging && console.log(`changed ${prevMessage} to ${message}`);

                return Object.assign({...prevMessage}, message);
            }

            return message;
        });

        const newMessages = oldMessages.map(oldMessage => {
            const changedMessage = changedMessages.find(({id}) => id === oldMessage.id);

            return changedMessage || oldMessage;
        });

        commonActions.appState.setMessages(newMessages);
    };

    public onAuthorValuesChanged = (data: ProtocolMessageAuthorValuesChangedData) => {
        const authors = appStateAuthorsSelector(getStore());

        const newAuthors = authors.map(author => {
            if (author.id === data.author_id) {
                Object.keys(data.values).forEach(key => {
                    author[key] = data.values[key];
                });
            }

            return author;
        });

        commonActions.appState.setAuthors(newAuthors);
    };
}

export const appService = new AppService();
