export interface IDAO {
  /**
   * Takes username and returns user id.
   */
  getUser(username: string): Promise<number>;
}
