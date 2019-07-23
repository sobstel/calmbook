import Post from "./Post";

type PageInput = {
  name: string;
  avatar: string;
  posts: Post[];
};

class Page {
  input: PageInput;

  constructor(input: PageInput) {
    this.input = input;
  }

  get avatar() {
    return this.input.avatar;
  }

  get name() {
    return this.input.name;
  }

  get posts() {
    return this.input.posts;
  }
}

export default Page;
