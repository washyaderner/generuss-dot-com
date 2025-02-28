# Pre-Merge Checklist

This document provides a standardized checklist for merging feature branches into the development branch and preparing for production deployments. Following these guidelines will help prevent common issues and ensure a smoother development process.

## Before Creating a Pull Request

### Code Quality

- [ ] All code follows project style guidelines
- [ ] No console.log statements or debugging code remains
- [ ] No unused imports or variables
- [ ] All components have proper PropTypes or TypeScript types
- [ ] Code is properly formatted (run linter)
- [ ] Comments explain complex logic and decisions

### Testing

- [ ] All new features have been manually tested
- [ ] Existing functionality still works as expected
- [ ] Mobile responsiveness has been verified
- [ ] Browser compatibility checked (Chrome, Firefox, Safari)
- [ ] Performance impact considered

### Critical Files Check

- [ ] **next.config.js**: Verify all domains in images.domains are necessary and documented
- [ ] **package.json**: Check for version conflicts or unnecessary dependencies
- [ ] **tailwind.config.js**: Ensure custom styles don't override existing ones
- [ ] **.env.example**: Update with any new environment variables
- [ ] **app/layout.tsx**: Check for changes that might affect global layout

## During Pull Request Review

### Merge Conflict Prevention

- [ ] Pull latest changes from the target branch before creating PR
- [ ] Resolve any conflicts locally before pushing
- [ ] If conflicts arise during PR, carefully review each conflict:
   - For configuration files, merge all necessary settings
   - For component changes, ensure both functionalities are preserved if needed
   - Document complex conflict resolutions in PR comments

### Documentation

- [ ] Update README.md if necessary
- [ ] Document new features or API changes
- [ ] Add inline comments for complex logic
- [ ] Update .env.example with new environment variables

## After Merging

### Clean-up

- [ ] Remove any temporary files created during development
- [ ] Delete the feature branch after successful merge
- [ ] Verify the deployment preview works correctly

### Verification

- [ ] Check that no new errors appear in console or logs
- [ ] Verify critical paths work in the merged environment
- [ ] Run performance checks if applicable

## Preparing for Production (dev → main)

### Final Verification

- [ ] All features in the release have been tested in the dev environment
- [ ] No known bugs or issues remain unresolved
- [ ] Performance metrics are acceptable
- [ ] All content is finalized and approved
- [ ] SEO metadata is correct and complete

### Deployment Readiness

- [ ] All environment variables are configured for production
- [ ] Database migrations or schema changes are planned
- [ ] Backup strategy is in place
- [ ] Rollback plan is documented

## Common Issues and Solutions

### Configuration File Conflicts

Configuration files like `next.config.js` often cause merge conflicts because they are modified across different feature branches. To avoid issues:

1. **Document all changes** in the PR description
2. **Add inline comments** explaining the purpose of each configuration
3. **Merge the target branch** into your feature branch before creating a PR
4. **Communicate with the team** when making configuration changes

### Content Type Issues

When working with different content formats (Markdown, Rich Text, etc.), ensure:

1. The components can handle multiple content types
2. Fallback rendering is implemented
3. Type checking validates the content before attempting to render

### Git Workflow Best Practices

1. Keep feature branches short-lived
2. Commit frequently with descriptive messages
3. Rebase feature branches on dev before creating PRs
4. Use atomic commits that address a single concern
5. Include "[Cursor] " prefix in all commit messages and PR titles 