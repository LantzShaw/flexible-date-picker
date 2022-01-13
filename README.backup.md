# multi-date-picker

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Records

**1. Using less-loader, it got error 'this.getOptions() is not a function'. this causes of the version of less-loader**

```bash
    npm i less-loader@^6  -D
    yarn add less-loade@<6 --dev
```

```bash
    npm publish
    需要认证邮箱，不然发布不了
```

### 🎅🏻 Command Collection

- `npm i ` 下载依赖
- `npm version patch` 更新版本 补丁 例如: 0.0.1
- `npm version minor` 更新版本 小修小改 例如: 0.1.0
- `npm version major` 更新版本 大改动 例如: 1.0.0
- `npm publish` 更新版本后执行
- `npm unpublish 包名@版本` 删除指定版本
- `npm unpublish 包名 --force` 删除整个包

> 参考地址: https://www.cnblogs.com/jasonwang2y60/p/11382349.html

> 参考地址: https://blog.csdn.net/u010227042/article/details/108813855
> https://zhuanlan.zhihu.com/p/80754775


### 🎉Questions
1. When run `npm version patch`, get a `Git working directory not clean.` error.
```sh
    git add .
    git commit -m "publish to npm"
    npm version patch
```