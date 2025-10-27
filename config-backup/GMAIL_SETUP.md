# Email Configuration Guide

## Current Status

✅ **Development Environment:** Fully configured and working!
- **Email Service:** Mailpit (local email testing)
- **From Address:** startup.support@dict.gov.ph
- **Access:** http://localhost:8025
- **Status:** All OTP codes and emails are captured locally

⏳ **Production Environment:** To be configured before deployment
- Contact DICT IT administrator for email server details
- See production options below

---

## Development Setup (ACTIVE)

All emails are captured by **Mailpit** - no configuration needed!

**How it works:**
1. Application sends emails normally
2. Mailpit intercepts them (no emails actually sent)
3. View all emails at: http://localhost:8025
4. Perfect for testing OTP codes, password resets, notifications

**Test it:**
- Sign up for a new account
- Check http://localhost:8025 for the OTP email
- Copy the OTP code from the email
- Complete registration

---

## Production Setup (FUTURE)

When deploying to production, you'll need to configure real email sending.

### Option 1: DICT Mail Server (Recommended)

Contact your DICT IT administrator and request:
- Mail server hostname (e.g., mail.dict.gov.ph)
- SMTP port (usually 587 or 465)
- Authentication username and password
- From address approval for startup.support@dict.gov.ph

Then update production `.env`:
```env
MAIL_HOST=mail.dict.gov.ph
MAIL_PORT=587
MAIL_USERNAME=startup.support@dict.gov.ph
MAIL_PASSWORD=provided-by-it-admin
MAIL_ENCRYPTION=tls
```

### Option 2: Gmail with App Password

**Requirements:**
- 2-Factor Authentication enabled (✅ Already done)
- Google Workspace admin must enable App Passwords
- Contact DICT IT to generate App Password

**Note:** The startup.support@dict.gov.ph account appears to be a Google Workspace account managed by DICT. Individual users cannot generate App Passwords unless enabled by the workspace administrator.

### Option 3: Third-Party Email Service

For high-volume production systems, consider:

**SendGrid** (Recommended for Government)
- Free tier: 100 emails/day
- Paid: $19.95/month for 50,000 emails
- Setup: https://sendgrid.com

**AWS SES** (Amazon Simple Email Service)
- Very cheap: $0.10 per 1,000 emails
- Requires AWS account
- Setup: https://aws.amazon.com/ses/

---

## Current Configuration Files

All configuration files use Mailpit for development:

✅ **config-backup/backend-laravel.env**
✅ **start-up-ws-main/start-up-ws-main/project/.env**

From address is set to: **startup.support@dict.gov.ph**

---

## Email Templates

The system sends emails for:

1. **OTP Verification** - Account signup and verification
2. **Password Reset** - Password recovery
3. **Application Status** - Startup application updates
4. **System Notifications** - Important announcements

All emails include the StartupPH branding and DICT footer.

---

## Next Steps for Production

Before deploying to production:

1. ☐ Contact DICT IT administrator
2. ☐ Request email server details or App Password
3. ☐ Update production `.env` file with real credentials
4. ☐ Test email sending on staging server
5. ☐ Verify OTP delivery works
6. ☐ Monitor email delivery rates

---

## Troubleshooting

### Development

**Problem:** Can't access http://localhost:8025
- **Solution:** Make sure Docker is running: `docker ps`
- Check Mailpit container is up: `docker logs start-up-ws-main-mailpit`

**Problem:** Emails not appearing in Mailpit
- **Solution:** Clear Laravel config: `docker exec start-up-ws-main-app php artisan config:clear`
- Check `.env` has: `MAIL_HOST=mailpit`

### Production (Future)

See production email service documentation when configured.

---

**Current Status:** Development ready ✅  
**Production Status:** Pending IT configuration ⏳  
**Last Updated:** October 27, 2025
