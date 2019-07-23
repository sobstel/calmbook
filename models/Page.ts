import Post from './Post';

type PageInput = {
  name: string,
  posts: Array<Post>,
}

class Page {
  input: PageInput;

  constructor(input: PageInput) {
    this.input = input;
  }

  get name() {
    return this.input.name;
  }

  get posts() {
    return this.input.posts;
  }
}

export default Page;
