import React from 'react';
import {Router,Route,RouteHistory,Link} from 'similar-react-router';

import FormIndex from './form/index.jsx';
import FormBase from './form/base.jsx';
import FormChange from './form/change.jsx';

import SampleIndex from './sample/index.jsx';
import SampleBase from './sample/base.jsx';
import SampleIcon from './sample/icon.jsx';
import SampleMulti from './sample/multi.jsx'

import PluginIndex from './plugin/index.jsx';
import PluginUpload from './plugin/upload.jsx';
import PluginToolbar from './plugin/toolbar.jsx';

class TopHeader extends React.Component{
	render(){
		var hash = RouteHistory.curHash.hash;

		return (<div className="top-navbar">
				<ul className="navbar">
					<li className="nav-item"> 
						<a role="button" className={"item-title"+(hash.indexOf("docs")!=-1?" active":"")} >
							文档
						</a>
						<a role="button" className={"item-title"+(hash.indexOf("demo")!=-1?" active":"")}>
							示例
						</a>
						<a role="button" className="item-title" href="https://github.com/liuhong1happy/react-umeditor" target="_blank">
							Github
						</a>
					</li>
				</ul>
			</div>)
	}
}
class RightNavbar extends React.Component {
	render () {
		var hash = RouteHistory.curHash.hash;
		return (
			<div className="left-navbar">
				<ul className="navbar">
					<li className="nav-item"> 
						<div className="item-title">
							基础示例
						</div>
						<ul className="sub-navbar">
							<li className="nav-item">
								<Link className={ hash.indexOf('/sample/base')!=-1?"active":"" } to="/demo/sample/base?title=基础示例 > 最简单示例" anchor={true} role="button">最简单示例</Link>
							</li>
							<li className="nav-item">
								<Link className={ hash.indexOf('/sample/icon')!=-1?"active":"" } to="/demo/sample/icon?title=基础示例 > 自定义功能" anchor={true} role="button">自定义功能</Link>
							</li>
							<li className="nav-item">
								<Link className={ hash.indexOf('/sample/multi')!=-1?"active":"" } to="/demo/sample/multi?title=基础示例 > 同时渲染更多" anchor={true} role="button">同时渲染更多</Link>
							</li>
						</ul>
					</li>
					<li className="nav-item"> 
						<div className="item-title">插件示例</div>
						<ul className="sub-navbar">
							<li className="nav-item">
								<Link className={ hash.indexOf('/plugin/upload')!=-1?"active":"" } to="/demo/plugin/upload?title=插件示例 > 文件上传" anchor={true} role="button">图片上传</Link>
							</li>
							<li className="nav-item">
								<Link className={ hash.indexOf('/plugin/toolbar')!=-1?"active":"" } to="/demo/plugin/toolbar?title=插件示例 > 自定义功能按钮" anchor={true} role="button">自定义功能按钮</Link>
							</li>
						</ul>
					</li>
					<li className="nav-item"> 
						<div className="item-title">表单示例</div>
						<ul className="sub-navbar">
							<li className="nav-item">
								<Link className={ hash.indexOf('/form/base')!=-1?"active":"" } to="/demo/form/base?title=表单示例 > 简单的表单" anchor={true} role="button">简单的表单</Link>
							</li>
							<li className="nav-item">
								<Link className={ hash.indexOf('/form/change')!=-1?"active":"" } to="/demo/form/change?title=表单示例 > 内容更改事件" anchor={true} role="button">内容更改事件</Link>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		)
	}
}

class UmeditorApp extends React.Component {
	render(){
		return (<div className="ueditor-app">
			<TopHeader />
			<RightNavbar />	
			<div className="right-content">
				{this.props.children}
			</div>
		</div>)
	}
}

class RouterApp extends React.Component {
	render(){
		return (
			<Router defaultRoute="/demo/sample/base" path="/" component={UmeditorApp}>
				<Route path="demo/sample" component={SampleIndex}>
					<Route path="base" component={SampleBase}></Route>
					<Route path="icon" component={SampleIcon}></Route>
					<Route path="multi" component={SampleMulti}></Route>
				</Route>
				<Route>
					<Route path="upload" component={PluginUpload}></Route>
					<Route path="toolbar" component={PluginToolbar}></Route>
				</Route>
				<Route path="demo/form" component={FormIndex}>
					<Route path="base" component={FormBase}></Route>
					<Route path="change" component={FormChange}></Route>
				</Route>
			</Router>
		)
	}
}
export default RouterApp;