import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000';

// Test data
const testUser = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123'
};

async function testAPI() {
  console.log('🚀 Starting API Tests...\n');

  try {
    // Test 1: Welcome route
    console.log('1. Testing welcome route...');
    const welcomeResponse = await fetch(`${BASE_URL}/`);
    const welcomeData = await welcomeResponse.json();
    console.log('✅ Welcome:', welcomeData.message);
    console.log('');

    // Test 2: Register user
    console.log('2. Testing user registration...');
    const registerResponse = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    });
    
    const registerData = await registerResponse.json();
    if (registerResponse.ok) {
      console.log('✅ Registration successful!');
      console.log('User:', registerData.data.name, registerData.data.email);
      console.log('Token received:', registerData.data.token ? 'Yes' : 'No');
    } else {
      console.log('❌ Registration failed:', registerData.error);
    }
    console.log('');

    // Test 3: Login user
    console.log('3. Testing user login...');
    const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    });

    const loginData = await loginResponse.json();
    let authToken = null;
    
    if (loginResponse.ok) {
      console.log('✅ Login successful!');
      console.log('User:', loginData.data.name, loginData.data.email);
      authToken = loginData.data.token;
      console.log('Token received:', authToken ? 'Yes' : 'No');
    } else {
      console.log('❌ Login failed:', loginData.error);
    }
    console.log('');

    if (authToken) {
      // Test 4: Access user profile (protected route)
      console.log('4. Testing protected profile route...');
      const profileResponse = await fetch(`${BASE_URL}/api/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      const profileData = await profileResponse.json();
      if (profileResponse.ok) {
        console.log('✅ Profile access successful!');
        console.log('Profile data:', profileData.data);
      } else {
        console.log('❌ Profile access failed:', profileData.error);
      }
      console.log('');

      // Test 5: Access protected route
      console.log('5. Testing protected route...');
      const protectedResponse = await fetch(`${BASE_URL}/api/protected`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      const protectedData = await protectedResponse.json();
      if (protectedResponse.ok) {
        console.log('✅ Protected route access successful!');
        console.log('Protected data:', protectedData.message);
        console.log('User data:', protectedData.user);
      } else {
        console.log('❌ Protected route access failed:', protectedData.error);
      }
      console.log('');

      // Test 6: Access protected route without token
      console.log('6. Testing protected route without token...');
      const noTokenResponse = await fetch(`${BASE_URL}/api/protected`);
      const noTokenData = await noTokenResponse.json();
      
      if (!noTokenResponse.ok && noTokenData.error.includes('no token')) {
        console.log('✅ Access correctly denied without token:', noTokenData.error);
      } else {
        console.log('❌ Should have been denied access:', noTokenData);
      }
    }

    console.log('\n🎉 API tests completed!');

  } catch (error) {
    console.error('❌ Error during testing:', error.message);
  }
}

// Run tests if server is running
testAPI();