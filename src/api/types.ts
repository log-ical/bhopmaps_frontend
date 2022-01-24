export type Map = {
    id: string;
    author: string;
    authorId: string;
    mapName: string;
    thumbnail: string;
    downloads: number;
    description: string;
    gameType: string;
    createdAt: Date;
    updatedAt: Date;
};

export type User = {
    id: string;
    username: string;
    avatar: string;
    isBeta: boolean;
    betaKey: string;
    createdAt: Date;
    updatedAt: Date;
}
