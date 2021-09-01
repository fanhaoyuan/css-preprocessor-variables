import { Traveller } from './interfaces';

export const less: Traveller = () => {
    const variables: Record<string, string> = {};

    return {
        onComplete: () => variables,
    };
};
