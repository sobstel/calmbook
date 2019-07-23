import Post from './Post';

type PageInput = {
  posts: Array<Post>,
}

class Page {
  input: PageInput;

  constructor(input: PageInput) {
    this.input = input;
  }

  get posts(): Array<Post> {
    return this.input.posts;
  }
}

export default Page;
