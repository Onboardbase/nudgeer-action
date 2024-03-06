<div style="text-align: center;">

# Nudgeer action 

This action is built to help your CI to validate your deployment security and should run through PR only.

Check out [Website](https://nudgeer.com/) and [Documentation](https://docs.nudgeer.com/) for more
</div>


## Usage

Check static domain after a PR gets merged.

```yaml
name: 'Check security by Nudgeer'

on:
  pull_request:
    types: [closed]

jobs:
  build:
      name: check
      runs-on: ubuntu-latest
      if: github.event.pull_request.merged == true
      steps:
      - name: Check website
        uses: onboardbase/nudgeer-action@v2
        with:
          domain: "yourdomain.com"
          wait: '1000' # default 10sec
```

Via deployment preview.

```yaml
name: 'Check security by Nudgeer'

on:
  pull_request:
    types: [opened]

jobs:
  deploy_preview:
    name: Deploy Preview
    runs-on: ubuntu-latest
    outputs:
      preview_domain: ${{ steps.get_preview_domain.outputs.preview_domain }}
    steps:
      - name: Deploy preview
        id: get_preview_domain
        run: |
          # Add your deployment steps here
          preview_domain="example.com"  # Replace this with your actual domain
          echo "::set-output name=preview_domain::$preview_domain"
  
  check_security:
    name: Check Security
    runs-on: ubuntu-latest
    needs: [deploy_preview] 
    if: github.event.pull_request.merged == true
    steps:
      - name: Check website
        uses: onboardbase/nudgeer-action@v2
        with:
          domain: ${{ needs.deploy_preview.outputs.preview_domain }}
          wait: '4000'

```
