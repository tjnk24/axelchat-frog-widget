import {TagDto} from '__utils/types';

export type AuthorDto = {
    serviceBadge: string;
    leftTags?: TagDto[];
    rightTags?: TagDto[];
    leftBadges?: string[];
    rightBadges?: string[];
    customBackgroundColor?: string;
    color?: string;
    name?: string;
}

interface OwnProps {
    author?: AuthorDto;
    showPlatformIcon?: boolean;
}

export type Props = OwnProps;
