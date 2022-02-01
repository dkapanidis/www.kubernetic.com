# DEVELOP

## Branches

* The `master` branch is the [live] documentation.
* The `develop` branch is the [next release] documentation.

[live]: https://www.kubernetic.com/
[next release]: https://develop--www-kubernetic.netlify.app/

## Run locally

Site can be previewed locally with [nextjs].

[nextjs]: https://nextjs.org/

* To install:

```shell
yarn
```

* To start:

```shell
yarn start
```

## Deployment

Continuous Deployment (CD) is done with [Vercel]:

* from `master` branch to https://www.kubernetic.com/.
* from `develop` branch to https://develop--www-kubernetic.netlify.app/.
* from PRs as Preview with dedicated URL for each one.

[Vercel]: https://vercel.com/dkapanidis/www-kubernetic-com
