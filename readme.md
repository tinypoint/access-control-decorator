# access-control-decorator

> An access-control-decorator baesd on React and React-Router@4.x to prevent user access page from invalid routes.

> 一个装饰器，用于控制页面的访问来源，配置后，该页面只能从合法的页面进入,从其他途径（包括直接从浏览器地址栏输入）将会被拦截，并直接重定向到首页或者开发者配置的页面

# params
- options 配置对象
- {string[]} options.accessRoutes 允许访问的页面路径
- {string} [options.redirect] 访问不合法重定向路由，默认跟路由'/'

# example
- 只允许从支付页访问支付成功页,从其他途径访问将会被拦截，并重定向到home页

``` javascript
 @accessControl({
   accessRoutes: ['/pay'],
   redirect: '/home'
 })
 export default class PaySuc extends Component {
   ...
 }
```
