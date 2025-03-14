<p align="center">
  <img src="../../static/logos/ui/logo.sans-ui.white.svg" alt="Sans UI Logo" width="180" height="60" style="margin-right: 20px;" />
  <img src="../../static/logos/api/logo.sans-api.white.svg" alt="Sans API Logo" width="180" height="60" style="margin-right: 20px;" />
  <img src="../../static/logos/db/logo.sans-db.white.svg" alt="Sans DB Logo" width="180" height="60" />
</p>

# Sans UI Backend Example

This is a simple backend API example for Sans UI using Elysia.js and Mailgun. It provides an API endpoint for handling subscription form submissions and sending welcome emails.

## Features

- RESTful API built with Elysia.js
- Email sending with Mailgun
- Supabase integration for storing subscribers
- CORS support for cross-origin requests
- Environment-based configuration

## Prerequisites

- Node.js 18+ (for ES modules support)
- Supabase account (for storing subscribers)
- Mailgun account (for sending emails)

## Setup

1. Clone the repository
2. Navigate to the backend example directory:
   ```bash
   cd examples/backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy the sample environment file and update it with your credentials:
   ```bash
   cp sample.env .env
   ```
5. Edit the `.env` file with your Mailgun API key and other settings

## Configuration

Update the `.env` file with your own settings:

```env
# API Configuration
PORT=3001
API_KEY=your_api_key_here

# Mailgun Configuration
MAILGUN_API_KEY=your_mailgun_api_key_here
MAILGUN_DOMAIN=your_mailgun_domain.com
EMAIL_FROM=Sans UI <noreply@your_mailgun_domain.com>

# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your_supabase_anon_key_here
SUPABASE_TABLE=subscribers

# CORS Configuration
ALLOW_ORIGINS=http://localhost:3000,http://localhost:8000
```

## Running the API

Start the server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## API Endpoints

### Health Check

```
GET /health
```

Returns the API status and current timestamp.

### Subscribe

```
POST /subscribe
```

Accepts subscription form data and sends a welcome email.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "consent": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Subscription successful"
}
```

### Get Subscribers (Protected)

```
GET /subscribers
```

Returns a paginated list of subscribers with filtering options. Requires API key authentication.

**Headers:**

```
Authorization: Bearer your_api_key_here
```

**Query Parameters:**

- `search` - Search term to filter subscribers by name or email
- `consent` - Filter by consent status (`true` or `false`)
- `page` - Page number for pagination (default: 1)
- `pageSize` - Number of items per page (default: 20)

**Response:**

```json
{
  "success": true,
  "count": 5,
  "totalCount": 25,
  "page": 1,
  "pageSize": 20,
  "totalPages": 2,
  "subscribers": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "consent": true,
      "created_at": "2023-01-01T00:00:00.000Z"
    },
    // ...more subscribers
  ]
}
```

### Get Subscriber by ID (Protected)

```
GET /subscribers/:id
```

Returns a single subscriber by ID. Requires API key authentication.

**Headers:**

```
Authorization: Bearer your_api_key_here
```

**Response:**

```json
{
  "success": true,
  "subscriber": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "consent": true,
    "created_at": "2023-01-01T00:00:00.000Z"
  }
}
```

### Delete Subscriber (Protected)

```
DELETE /subscribers/:id
```

Deletes a subscriber by ID. Requires API key authentication.

**Headers:**

```
Authorization: Bearer your_api_key_here
```

**Response:**

```json
{
  "success": true,
  "message": "Subscriber deleted successfully"
}
```

## Integration with Sans UI Frontend

Update the subscription form in the frontend example to send data to this API:

```javascript
// In subscribe.js
async handleSubmit(event) {
  event.preventDefault();
  
  // Validate form
  if (!this.validateEmail()) return;
  
  const formData = {
    name: this.nameInput.value.trim(),
    email: this.emailInput.value.trim(),
    consent: this.consentCheckbox.checked
  };
  
  try {
    // Send data to the backend API
    const response = await fetch('http://localhost:3001/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Show success message
      this.subscribeForm.style.display = 'none';
      this.successMessage.style.display = 'block';
      
      // Show native notification if bridge is available
      if (window.bridge && typeof window.bridge.showNotification === 'function') {
        window.bridge.showNotification({
          title: 'Subscription Successful',
          text: `Thank you, ${formData.name}! You've been added to our waitlist.`,
          iconName: 'mail-mark-important'
        });
      }
    } else {
      this.showError(result.message || 'Subscription failed');
    }
  } catch (error) {
    console.error('Subscription error:', error);
    this.showError(`Could not process subscription: ${error.message}`);
  }
}
```

## License

Same as the main Sans UI project.

---

## Connect With Us

[![Reddit](https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white)](https://www.reddit.com/r/sans_ui/)
[![X](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/profullstackinc)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/profullstackinc)
[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/+VGCI_sR-guhmNTNh)
[![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)](https://join.slack.com/t/profullstackinc/shared_invite/zt-2d9c842fk-jo848We~tDajW9nn6DEggw)
[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/XXvzu4G4)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/profullstack)

*Built happily using "Windsurf on Linux"*  
*Sponsored by [Profullstack, Inc.](https://profullstack.com)*
