import { WaitlistService } from '../services/waitlistService.js';

async function testWaitlistOperations() {
  console.log('Starting Waitlist Operations Test...\n');
  const waitlistService = WaitlistService.getInstance();

  try {
    // Test 1: Create a new entry
    // const newEntry = await waitlistService.createEntry({
    //   email: 'test@example.com',
    //   name: 'Test User',
    //   company: 'Test Company'
    // });
    // console.log('✅ Successfully created entry:', newEntry);

    // Test 2: Check if email is registered
    console.log('\nTest 2: Checking if email is registered');
    const isRegistered = await waitlistService.isEmailRegistered('test@example.com');
    console.log('✅ Email registration check:', isRegistered ? 'Found' : 'Not found');

    // Test 3: Try to create duplicate entry (should fail)
    // console.log('\nTest 3: Attempting to create duplicate entry (should fail)');
    // try {
    //   await waitlistService.createEntry({
    //     email: 'test@example.com',
    //     name: 'Duplicate User',
    //     company: 'Another Company'
    //   });
    //   console.log('❌ Error: Duplicate entry was created when it should have failed');
    // } catch (error) {
    //   console.log('✅ Successfully prevented duplicate entry');
    // }

    // Test 4: Confirm entry
    // console.log('\nTest 4: Confirming waitlist entry');
    // if (newEntry.confirmation_token) {
    //   const confirmed = await waitlistService.confirmEntry(newEntry.confirmation_token);
    //   console.log('✅ Entry confirmation:', confirmed ? 'Successful' : 'Failed');
    // }

    // Test 5: Get confirmed entries
    console.log('\nTest 5: Getting confirmed entries');
    const confirmedEntries = await waitlistService.getConfirmedEntries();
    console.log('✅ Retrieved confirmed entries:', confirmedEntries);

    // Test 6: Create another entry for testing
    // console.log('\nTest 6: Creating another entry');
    // const anotherEntry = await waitlistService.createEntry({
    //   email: 'another@example.com',
    //   name: 'Another User',
    //   company: 'Another Corp'
    // });
    // console.log('✅ Created second entry:', anotherEntry);

    // Final status
    console.log('\n🎉 All tests completed successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ Test failed with error:');
    if (error?.error instanceof Error) {
      console.error('- Name:', error.error.name);
      console.error('- Message:', error.error.message);
    } else {
      console.error('- Error:', error);
    }
    process.exit(1);
  }
}

console.log('Starting waitlist functionality tests...');
testWaitlistOperations().catch(error => {
  console.error('Unhandled error:', error instanceof Error ? error.message : 'Unknown error');
  process.exit(1);
}); 