// Sample user account lookups for authentication and admin review
use('retailCatalog');

// Login helper: find active account by username or email
const loginCandidate = db.users.findOne(
  {
    $or: [
      { username: 'priya.desai' },
      { email: 'priya.desai@example.com' }
    ],
    status: 'active'
  },
  {
    passwordHash: 1,
    roles: 1
  }
);

// Admin dashboard: show recently locked accounts
const lockedAccounts = db.users
  .find(
    { status: 'locked' },
    {
      username: 1,
      email: 1,
      updatedAt: 1
    }
  )
  .sort({ updatedAt: -1 })
  .limit(25)
  .toArray();

print('Login candidate record:');
printjson(loginCandidate);
print(`Locked accounts returned: ${lockedAccounts.length}`);
