type PostInput = {
  message: string,
  timestamp: number,
}

class Post {
  input: PostInput;

  constructor(input: PostInput) {
    this.input = input;
  }

  get message(): string {
    return this.input.message;
  }

  get timestamp(): number {
    return this.input.timestamp;
  }
}

export default Post;
