export class Post {
    constructor(
      private id: string,
      private creator_id: string,
      private content: string,
      private likes: number,
      private dislikes: number,
      private created_at: string,
      private updated_at: string
    ) {}

    public getId(): string {
      return this.id;
    }

    public setId(newValue: string): void {
      this.id = newValue;
    }

    public getCreatorId(): string {
      return this.creator_id;
    }

    public setCreatorId(newValue: string): void {
      this.creator_id = newValue;
    }

    public getContent(): string {
      return this.content;
    }

    public setContent(newValue: string): void {
      this.content = newValue;
    }

    public getLikes(): number {
      return this.likes;
    }

    public setLikes(newValue: number): void {
      this.likes = newValue;
    }

    public getDislikes(): number {
      return this.dislikes;
    }

    public setDislikes(newValue: number): void {
      this.dislikes = newValue;
    }

    public getCreatedAt(): string {
      return this.created_at;
    }

    public setCreatedAt(newValue: string): void {
      this.created_at = newValue;
    }

    public getUpdatedAt(): string {
      return this.updated_at;
    }

    public setUpdatedAt(newValue: string): void {
      this.updated_at = newValue;
    }
  }