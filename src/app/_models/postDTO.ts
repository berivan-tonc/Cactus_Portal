import { Book } from "./book";
import { Movie } from "./movie";
import { Music } from "./music";
import { Post } from "./post";
import { User } from "./user";

export class PostDTO {
    post!: Post;
    movie!: Movie;
    music!: Music;
    book!: Book;
    user!: User;
}