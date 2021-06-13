export class Post {
    id!: number;
    category!: string;
    user_id!: number;
    book_id?: number;
    music_id?: number;
    movie_id?: number;
    status!: boolean;
    comment!: string;
    point!: number;
    editdate!: Date;
}