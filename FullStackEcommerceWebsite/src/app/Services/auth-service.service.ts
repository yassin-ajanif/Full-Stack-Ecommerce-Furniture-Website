```typescript
// ...existing code...

  /**
   * Decodes the JWT token payload and returns it as an object.
   * Returns null if no token is present or if decoding fails.
   */
  getTokenPayload(): any | null {
    if (!this.userToken || !this.userToken.token) return null;
    try {
      const payloadBase64 = this.userToken.token.split('.')[1];
      const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodeURIComponent(escape(payloadJson)));
    } catch (e) {
      return null;
    }
  }
// ...existing code...
```