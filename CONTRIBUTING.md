# CONTRIBUTING.md

- [CONTRIBUTING.md](#contributingmd)
  - [How to contribute](#how-to-contribute)
    - [Submitting a patch](#submitting-a-patch)
    - [Pull Request Process](#pull-request-process)

## How to contribute

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

### Submitting a patch

1. It's generally best to start by opening a new issue describing the bug or
   feature you're intending to fix. Even if you think it's relatively minor,
   it's helpful to know what people are working on. Mention in the initial
   issue that you are planning to work on that bug or feature so that it can
   be assigned to you.

2. Considering each syndication client seem to have their own specificities, make
   sure you provide enough information about the client in question if you want
   to add new elements or update existing ones. Link to their official documentation
   and provide examples.

3. Create and run tests. Your new addition must be covered by unit tests.

4. Follow the normal process of [forking][] the project, and setup a new
   branch to work in.

5. Do your best to have [well-formed commit messages][] for each change.
   This provides consistency throughout the project, and ensures that commit
   messages are able to be formatted properly by various git tools.

6. Finally, push the commits to your fork and submit a [pull request][].

### Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

We'd love to accept your patches and contributions to this project. There are a just a few small guidelines you need to follow.

[forking]: https://help.github.com/articles/fork-a-repo
[pull request]: https://help.github.com/articles/creating-a-pull-request
[well-formed commit messages]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
