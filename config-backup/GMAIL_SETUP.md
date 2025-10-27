# Gmail Setup for Production

## Current Configuration

**Email Address:** startup.support@dict.gov.ph  
**Purpose:** 
- Send OTP codes for user verification
- Support email for user inquiries
- System notifications

---

## Development Setup (Current)

✅ Already configured! Emails are captured by **Mailpit** for testing.

- All emails appear in: http://localhost:8025
- No actual emails are sent
- Perfect for development and testing

---

## Production Setup

When deploying to production, you need to configure Gmail to send real emails.

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com
2. Click **Security** in the left menu
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the setup process to enable 2FA

### Step 2: Generate App Password

1. Go to: https://myaccount.google.com/apppasswords
2. You may need to sign in again
3. In the "Select app" dropdown, choose **Mail**
4. In the "Select device" dropdown, choose **Other (Custom name)**
5. Enter: **StartupPH Laravel**
6. Click **Generate**
7. **COPY THE 16-CHARACTER PASSWORD** (looks like: `abcd efgh ijkl mnop`)

### Step 3: Update Production .env

In your production server's `.env` file:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=startup.support@dict.gov.ph
MAIL_PASSWORD=your-16-char-app-password-here
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="startup.support@dict.gov.ph"
MAIL_FROM_NAME="StartupPH"
```

**Important Notes:**
- Use the 16-character App Password, NOT your regular Gmail password
- Remove all spaces from the App Password
- Keep this password secure and never commit it to Git

### Step 4: Test Email Sending

After deploying with the new configuration:

```bash
# Clear config cache
php artisan config:clear

# Test email sending
php artisan tinker
>>> Mail::raw('Test email from StartupPH', function($message) {
...     $message->to('your-test-email@example.com')
...             ->subject('Test Email');
... });
```

---

## Email Templates

The system sends emails for:

1. **OTP Verification** - When users sign up or verify their account
2. **Password Reset** - When users request password reset
3. **Application Status** - When startup applications are approved/rejected
4. **System Notifications** - Important updates and announcements

All emails will come from: **startup.support@dict.gov.ph**

---

## Troubleshooting

### "Less secure app access" Error
- Gmail no longer supports this. You MUST use App Passwords with 2FA enabled.

### "Invalid credentials" Error
- Double-check the App Password is correct (no spaces)
- Ensure 2FA is enabled on the Google account
- Make sure you're using `smtp.gmail.com` and port `587`

### Emails Not Sending
1. Check Laravel logs: `storage/logs/laravel.log`
2. Verify Gmail account isn't locked
3. Test SMTP connection:
   ```bash
   telnet smtp.gmail.com 587
   ```

### Gmail Daily Sending Limits
- Free Gmail: ~500 emails/day
- Google Workspace: ~2,000 emails/day
- If you need more, consider using a dedicated email service (SendGrid, AWS SES, etc.)

---

## Security Best Practices

✅ **DO:**
- Use App Passwords (never regular password)
- Store password in `.env` file (not in code)
- Keep `.env` file out of Git (already in `.gitignore`)
- Rotate App Password every 3-6 months
- Monitor sent email logs

❌ **DON'T:**
- Commit passwords to Git
- Share App Password with anyone
- Use the same password for multiple systems
- Disable 2FA to avoid App Passwords

---

## Current Status

- ✅ Email configured: `startup.support@dict.gov.ph`
- ✅ Development: Using Mailpit (http://localhost:8025)
- ⏳ Production: Needs App Password setup (see steps above)

---

**Last Updated:** October 27, 2025  
**Configured By:** DICT Development Team
