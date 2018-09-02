'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var accessControlDecorator = function accessControlDecorator(_ref) {
    var _ref$accessRoutes = _ref.accessRoutes,
        accessRoutes = _ref$accessRoutes === undefined ? [] : _ref$accessRoutes,
        _ref$redirect = _ref.redirect,
        redirect = _ref$redirect === undefined ? '/' : _ref$redirect;
    return function (WrappedComponent) {
        return (0, _reactRouter.withRouter)(function (props) {
            var _props$location$state = props.location.state,
                state = _props$location$state === undefined ? {} : _props$location$state,
                history = props.history;


            if (!state.from || accessRoutes.indexOf(state.from) < 0) {
                // eslint-disable-next-line
                if (ENV_PARAMS.env === 'local') {
                    console.warn('[access-control] Valid routes are [' + accessRoutes.join(',') + ']. Access comes from ' + (state.from || 'undefined') + ', access is invalid. Redirect to \'' + redirect + '\'.');
                }

                history.replace(redirect);
                return null;
            }

            return _react2.default.createElement(WrappedComponent, props);
        });
    };
};

exports.default = accessControlDecorator;