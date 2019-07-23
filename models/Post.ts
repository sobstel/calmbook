type PostInput = {
}

class Post {
  input: PostInput;

  constructor(input: PostInput) {
    this.input = input;
  }

  get message(): string {
    return '';
  }
}

export default Post;
