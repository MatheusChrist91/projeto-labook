export class LikeDislike {
    constructor(
      private user_id: string,
      private post_id: string,
      private like: number
    ) {}
  
    public getUserId(): string {
      return this.user_id;
    }
  
    public setUserId(newValue: string): void {
      this.user_id = newValue;
    }
  
    public getPostId(): string {
      return this.post_id;
    }
  
    public setPostId(newValue: string): void {
      this.post_id = newValue;
    }
  
    public getLikeStatus(): number {
      return this.like;
    }
  
    public setLikeStatus(newValue: number): void {
      this.like = newValue;
    }
  }