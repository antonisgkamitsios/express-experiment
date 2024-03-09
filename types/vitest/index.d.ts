import TestAgent from 'supertest/lib/agent';

/* eslint-disable no-var */

declare global {
  /**
   * This variable is only available in integration tests
   */
  var testRequest: TestAgent;
}
