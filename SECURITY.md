# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in this project, please report it by emailing [contact@generuss.com](mailto:contact@generuss.com).

**Please do not report security vulnerabilities through public GitHub issues.**

## Security Measures Implemented

### API Security
- Rate limiting on all API endpoints (10 requests/minute for chat, 5 requests/minute for calendar)
- Client IP tracking for rate limiting
- Input validation and sanitization
- No exposed API keys in version control

### Content Security Policy
- Comprehensive CSP headers configured in next.config.js
- Restricts script sources, frame sources, and other content types
- Prevents XSS and injection attacks

### Environment Variables
- All sensitive data stored in environment variables
- No secrets committed to version control
- Proper separation of development and production configs

### Dependencies
- Regular security audits with `npm audit`
- Dependencies kept up to date
- Unused dependencies removed to reduce attack surface

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Security Best Practices

1. **Never commit sensitive data** to version control
2. **Use environment variables** for all configuration
3. **Regularly update dependencies** and check for vulnerabilities
4. **Implement proper authentication** on all API endpoints
5. **Validate all inputs** on both client and server side
6. **Use HTTPS** for all communications in production

## Contact

For security-related questions or concerns, contact: [contact@generuss.com](mailto:contact@generuss.com)