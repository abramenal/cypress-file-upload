# CONTRIBUTING.MD
## Working on your first Pull Request?

You can learn how from this _free_ series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

## Steps to make it :cool:

### Fork the repo
Nothing special here, just do it!

### Enable Github Actions

Make sure to do it in **your** forked repo, it gives you ability to run CI the same way as maintainers do.

Furthermore, once you will submit PR, it will be surrounded with CI logs and a link to Cypress dashboard with tests overview. Nice, huh?!

### Do the work

No special guidelines here, just make sure to follow the coding guidelines that are set by linter and code formatter.

Once you will commit something, you will see pre-commit hook is running all the checks. After it all passed, you should be safe now.

### Test it thoroughly

Make sure to test it manually at least on one of the recipes (just take any one), and do it against 1-2 main browsers to ensure you didn't miss something.

Once it is all done, and if you have enabled Github Actions, it will automatically check all the recipes against all the browsers and using all the test cases and command's API variations. Safety first!

### Submit the PR

Make sure to follow PR template. Describe your changes, link issues - anything that could help us to review your awesome contribution faster and understand reasoning in a year after that.


### Receive shout-outs

After work is done, you should see your face shining in Contributors section. If by some reason you see contributors missed to add you - don't hesitate to insist, it is your right to be proud of it!
