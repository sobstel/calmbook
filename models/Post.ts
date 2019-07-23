type PostInput = {
  message: string;
  timestamp: number;
  images: string[];
};

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

  get images(): string[] {
    return this.input.images;
  }
}

export default Post;
