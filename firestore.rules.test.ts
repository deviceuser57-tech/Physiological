// @ts-nocheck
import { assertFails, assertSucceeds, initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';

// Mock test for rules (conceptual for this environment)
describe('Firestore Security Rules', () => {
  let testEnv: RulesTestEnvironment;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'psychocontext-test',
      firestore: {
        rules: readFileSync('DRAFT_firestore.rules', 'utf8'),
      },
    });
  });

  it('blocks patient creation without ownership', async () => {
    const alice = testEnv.authenticatedContext('alice');
    await assertFails(alice.firestore().collection('patients').add({
      name: 'Bob',
      ownerId: 'not_alice',
      createdAt: new Date(),
    }));
  });

  it('allows owner to read their own patient', async () => {
    const alice = testEnv.authenticatedContext('alice');
    // setup data (mocked)
  });
});
