# Podiweda Frontend - React with AWS Cognito

Modern, responsive authentication UI integrated with AWS Cognito.

## Features

- ✅ Custom authentication UI (no Cognito Hosted UI)
- ✅ Login, Signup, Email Verification, Password Reset
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Professional SaaS-style design
- ✅ Form validation and inline error handling
- ✅ Loading indicators
- ✅ Secure JWT token management
- ✅ Automatic token attachment to API requests
- ✅ Token expiration handling

## Prerequisites

- Node.js 16+
- npm or yarn
- AWS Cognito User Pool configured

## Installation

```bash
cd podiweda-frontend

# Install dependencies
npm install
```

## Configuration

Create `.env` file in the root directory:

```bash
REACT_APP_AWS_REGION=us-east-1
REACT_APP_USER_POOL_ID=us-east-1_XXXXXXXXX
REACT_APP_CLIENT_ID=7xxxxxxxxxxxxxxxxxxxxxx
```

## Run Development Server

```bash
npm start
```

Application will run on `http://localhost:3000`

## Build for Production

```bash
npm run build
```

Production build will be in `build/` directory.

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── AuthContainer.js      # Main auth container
│   │   ├── Login.js              # Login form
│   │   ├── Signup.js             # Signup form
│   │   ├── VerifyEmail.js        # Email verification
│   │   ├── ForgotPassword.js     # Password reset
│   │   └── SocialLogin.js        # Social login (optional)
│   ├── Dashboard.js              # Protected dashboard
│   └── ProtectedRoute.js         # Route protection
├── contexts/
│   └── AuthContext.js            # Auth state management
├── styles/
│   └── Auth.css                  # Authentication styles
├── utils/
│   └── api.js                    # API utility with JWT
└── App.js                        # Main app with routing
```

## Authentication Flow

### Sign Up
1. User enters name, email, password
2. Cognito creates user account
3. Verification code sent to email
4. User enters code to verify email
5. Account activated

### Sign In
1. User enters email and password
2. Cognito validates credentials
3. JWT tokens generated and stored in memory
4. User redirected to dashboard

### Password Reset
1. User clicks "Forgot password"
2. Enters email address
3. Verification code sent to email
4. User enters code and new password
5. Password updated

## API Integration

### Making Authenticated Requests

```javascript
import { apiRequest } from './utils/api';

// GET request
const profile = await apiRequest('http://localhost:8080/api/profile');

// POST request
const result = await apiRequest('http://localhost:8080/api/data', {
  method: 'POST',
  body: JSON.stringify({ name: 'Test' }),
});
```

### Automatic Token Handling

The `apiRequest` utility automatically:
- Retrieves current JWT token from Cognito
- Attaches token to `Authorization` header
- Handles 401 responses (redirects to login)
- Manages token expiration

## Components

### AuthContext

Provides authentication state and methods:

```javascript
const {
  user,              // Current user object
  loading,           // Loading state
  signUp,            // Sign up function
  signIn,            // Sign in function
  signOut,           // Sign out function
  confirmSignUp,     // Email verification
  forgotPassword,    // Request password reset
  confirmPassword,   // Confirm password reset
  getAccessToken,    // Get JWT token
} = useAuth();
```

### ProtectedRoute

Wraps components that require authentication:

```javascript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## Styling

### Responsive Design

The UI is fully responsive with breakpoints:
- Desktop: > 768px
- Tablet: 481px - 768px
- Mobile: < 480px

### Customization

Edit `src/styles/Auth.css` to customize:
- Colors and gradients
- Border radius
- Spacing
- Animations
- Button styles

## Security

### Token Storage
- Tokens stored in memory (not localStorage)
- Managed by Cognito SDK
- Automatic refresh handling
- No exposure in browser storage

### Best Practices
- HTTPS only in production
- No secrets in frontend code
- CORS properly configured
- Input validation on all forms
- XSS protection

## Testing

### Manual Testing

1. **Sign Up Flow**
   - Navigate to `/login`
   - Click "Sign up"
   - Fill form and submit
   - Verify email with code
   - Sign in

2. **Sign In Flow**
   - Enter credentials
   - Verify redirect to dashboard
   - Check API calls in Network tab

3. **Password Reset**
   - Click "Forgot password"
   - Enter email
   - Enter code and new password
   - Sign in with new password

### API Integration Testing

```javascript
// In Dashboard component
useEffect(() => {
  const testAPI = async () => {
    try {
      const data = await apiRequest('http://localhost:8080/api/profile');
      console.log('Profile:', data);
    } catch (err) {
      console.error('API Error:', err);
    }
  };
  testAPI();
}, []);
```

## Deployment

### Deploy to S3 + CloudFront

```bash
# Build
npm run build

# Upload to S3
aws s3 sync build/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

### Deploy to Netlify

```bash
# Build
npm run build

# Deploy
netlify deploy --prod --dir=build
```

### Deploy to Vercel

```bash
vercel --prod
```

## Environment Variables

### Development
```bash
REACT_APP_AWS_REGION=us-east-1
REACT_APP_USER_POOL_ID=us-east-1_XXXXXXXXX
REACT_APP_CLIENT_ID=7xxxxxxxxxxxxxxxxxxxxxx
```

### Production
Update values in your hosting platform's environment settings.

## Troubleshooting

### Issue: "User Pool ID not found"
**Solution:** Check `.env` file exists and contains correct values

### Issue: Email verification code not received
**Solution:** 
- Check spam folder
- Verify email configuration in Cognito
- Use SES for production email delivery

### Issue: CORS errors when calling backend
**Solution:**
- Verify backend CORS configuration
- Check backend is running on correct port
- Ensure `Authorization` header is allowed

### Issue: Token expired errors
**Solution:**
- Tokens expire after 1 hour
- User will be redirected to login automatically
- Implement refresh token logic if needed

## Dependencies

Key dependencies:
- `react` - UI framework
- `react-router-dom` - Routing
- `amazon-cognito-identity-js` - Cognito SDK

## License

MIT
