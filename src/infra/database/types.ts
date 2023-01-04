export interface DatabasePortInterface {
  connectToDatabase(): Promise<void>;
}
