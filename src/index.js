import React from 'react';
import { withRouter } from 'react-router';

/**
 * 一个装饰器，用于控制页面的访问来源，配置后，该页面只能从合法的页面进入
 * 从其他途径（包括直接从浏览器地址栏输入）将会被拦截，并直接重定向到首页或者开发者配置的页面
 *
 * @param {Object} options 配置对象
 * @param {string[]} options.accessRoutes 允许访问的页面路径
 * @param {string} [options.redirect] 访问不合法重定向路由，默认跟路由'/'
 *
 * @example 只允许从支付页访问支付成功页,从其他途径访问将会被拦截，并重定向到home页
 * @accessControl({
 *   accessRoutes: ['/pay'],
 *   redirect: '/home'
 * })
 * export default class PaySuc extends Component {
 *   ...
 * }
 */
const accessControlDecorator = ({ accessRoutes = [], redirect = '/' }) => WrappedComponent => withRouter((props) => {
    const { location: { state = {} }, history } = props;

    if (!state.from || accessRoutes.indexOf(state.from) < 0) {
        // eslint-disable-next-line
        if (ENV_PARAMS.env === 'local') {
          console.warn(`[access-control] Valid routes are [${accessRoutes.join(',')}]. Access comes from ${state.from || 'undefined'}, access is invalid. Redirect to '${redirect}'.`);
        }

        history.replace(redirect);
        return null;
    }

    return (
      <WrappedComponent {...props} />
    );
});

export default accessControlDecorator;
