export class ReconsentError extends Error {
  constructor() {
    super('GOOGLE_OAUTH_RECONSENT_REQUIRED');
    this.name = 'ReconsentError';
  }
}
