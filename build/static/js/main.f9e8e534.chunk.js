(this.webpackJsonpabtest=this.webpackJsonpabtest||[]).push([[0],{233:function(e,t,a){},234:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),i=a(24),s=a.n(i),c=a(69),l=a(102),d=Object(l.b)({name:"users",initialState:{value:[],calculatedRR7Value:null},reducers:{saveUsers:function(e,t){e.value=t.payload},calculateRR7days:function(e,t){e.calculatedRR7Value=t.payload}}}),o=d.actions,u=o.saveUsers,j=o.calculateRR7days,b=d.reducer,v=Object(l.a)({reducer:{users:b}}),h=a(103),O=a(87),f=a(88),p=a(104),x=a(101),y=a(117),m=a.n(y),_=a(134),g=a(89),R=a(28),S=a(72),k=a(123),I=a(145),C=a(240),D=a(241),w=a(238),U=a(46),Y=a(239),M=a(49),P=a.n(M),V=a(19),F=n.a.createContext(null);function N(){var e=Object(c.b)();return Object(V.jsx)(A,{handleSaveUsers:function(t){e(u(t))},notification:I.a,handleCalculateRR7:function(t){e(j(t))}})}var B=function(e){e.index;var t=Object(k.a)(e,["index"]),a=C.a.useForm(),r=Object(S.a)(a,1)[0];return Object(V.jsx)(C.a,{form:r,component:!1,children:Object(V.jsx)(F.Provider,{value:r,children:Object(V.jsx)("tr",Object(R.a)({},t))})})},E=function(e){var t=e.title,a=e.editable,n=e.children,i=e.dataIndex,s=e.record,c=e.handleSave,l=Object(k.a)(e,["title","editable","children","dataIndex","record","handleSave"]),d=Object(r.useState)(!1),o=Object(S.a)(d,2),u=o[0],j=o[1],b=Object(r.useRef)(null),v=Object(r.useContext)(F);Object(r.useEffect)((function(){u&&b.current.focus()}),[u]);var h=function(){j(!u),v.setFieldsValue(Object(g.a)({},i,s[i]))},O=function(){var e=Object(_.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.validateFields();case 3:t=e.sent,h(),c(Object(R.a)(Object(R.a)({},s),t)),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log("Save failed:",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),f=n;return a&&(f=u?Object(V.jsx)(C.a.Item,{style:{margin:0},name:i,rules:[{required:!0,message:"".concat(t," is required.")}],children:Object(V.jsx)(D.a,{ref:b,onPressEnter:O,onBlur:O})}):Object(V.jsx)("div",{className:"editable-cell-value-wrap",style:{paddingRight:24},onClick:h,children:n})),Object(V.jsx)("td",Object(R.a)(Object(R.a)({},l),{},{children:f}))},A=function(e){Object(p.a)(a,e);var t=Object(x.a)(a);function a(e){var r;return Object(O.a)(this,a),(r=t.call(this,e)).handleSave=function(e){var t=Object(h.a)(r.state.dataSource),a=t.findIndex((function(t){return e.key===t.key})),n=t[a],i=P()(e.last_activity_date.split(".").reverse()),s=P()(e.registration_date.split(".").reverse());P()(i).isBefore(s)?I.a.warning({message:"\u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e\u0441\u0442\u044c \u0432\u0432\u0435\u0434\u0435\u043d\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445"}):(t.splice(a,1,Object(R.a)(Object(R.a)({},n),e)),r.setState({dataSource:t}))},r.handleSaveOnServer=function(){var e=r.props,t=e.handleSaveUsers,a=e.notification;t(r.state.dataSource),a.success({message:"\u0422\u0430\u0431\u043b\u0438\u0446\u0430 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0430 (\u043a\u043e\u043d\u0441\u043e\u043b\u044c)"})},r.handleCalculateRR7=function(){var e=r.props,t=e.handleCalculateRR7,a=e.handleSaveUsers,n=r.state.dataSource;P.a.defaultFormat="DD.MM.YYYY";var i=0,s=0,c=n.map((function(e){var t=e.last_activity_date.split(".").reverse();t=P()(t);var a=e.registration_date.split(".").reverse();a=P()(a);var r=P()().format("DD.MM.YYYY").split(".").reverse();return r=P()(r),t.diff(a,"days")>=7&&(i+=1),r.diff(a,"days")>=7&&(s+=1),Object(R.a)(Object(R.a)({},e),{},{livePeriodInDays:t.diff(a,"days")})}));console.log("rr7returnedUsersCountAfterThenX ",i),console.log("rr7registeredUsersMoreThanX ",s),console.log((i/s*100).toFixed(2)),t((i/s*100).toFixed(2)),a(c),r.setState({dataSource:c})},r.columns=[{title:"User ID",dataIndex:"user_id",width:"20%",editable:!1},{title:"Date registration",dataIndex:"registration_date",width:"40%",editable:!0},{title:"Date Last Activity",dataIndex:"last_activity_date",width:"40%",editable:!0}],r.state={dataSource:[{key:"1",user_id:"1",registration_date:"01.08.2021",last_activity_date:"08.08.2021"},{key:"2",user_id:"2",registration_date:"01.08.2021",last_activity_date:"07.08.2021"},{key:"3",user_id:"3",registration_date:"08.08.2021",last_activity_date:"08.08.2021"},{key:"4",user_id:"4",registration_date:"08.08.2021",last_activity_date:"08.08.2021"},{key:"5",user_id:"5",registration_date:"08.08.2021",last_activity_date:"08.08.2021"},{key:"6",user_id:"6",registration_date:"08.08.2021",last_activity_date:"08.08.2021"},{key:"7",user_id:"7",registration_date:"08.08.2021",last_activity_date:"08.08.2021"},{key:"8",user_id:"8",registration_date:"08.08.2021",last_activity_date:"08.08.2021"}],count:3},r}return Object(f.a)(a,[{key:"render",value:function(){var e=this,t=this.state.dataSource,a={body:{row:B,cell:E}},r=this.columns.map((function(t){return t.editable?Object(R.a)(Object(R.a)({},t),{},{onCell:function(a){return{record:a,editable:t.editable,dataIndex:t.dataIndex,title:t.title,handleSave:e.handleSave}}}):t}));return Object(V.jsxs)("div",{children:[Object(V.jsxs)(w.a,{children:[Object(V.jsx)(U.a,{onClick:this.handleSaveOnServer,type:"primary",style:{marginBottom:16,marginRight:16},children:"Save"}),Object(V.jsx)(U.a,{onClick:this.handleCalculateRR7,type:"primary",style:{marginBottom:16,marginRight:16},children:"Calculate"})]}),Object(V.jsx)(Y.a,{components:a,rowClassName:function(){return"editable-row"},bordered:!0,size:"small",dataSource:t,columns:r})]})}}]),a}(n.a.Component),q=a(141),J=a.n(q),T=a(142);function X(){var e=Object(c.c)((function(e){return e.users})),t=Object(r.useState)([]),a=Object(S.a)(t,2),n=a[0],i=a[1],s=Object(r.useState)([]),l=Object(S.a)(s,2),d=l[0],o=l[1];return Object(r.useEffect)((function(){for(var t=[],a=[],r=Math.max.apply(Math,Object(h.a)(e.value.map((function(e){return e.livePeriodInDays}))).concat([0])),n=0;n<r;n++)t.push(n);e.calculatedRR7Value&&(e.value.map((function(e){return t.includes(e.livePeriodInDays)||t.push(e.livePeriodInDays),null})),t.sort((function(e,t){return e-t})),a=t.map((function(t){var a=0;return e.value.map((function(e){t===e.livePeriodInDays&&(a+=1)})),a})),o(a),i(t))}),[e.value,e.calculatedRR7Value]),(null===e||void 0===e?void 0:e.calculatedRR7Value)?Object(V.jsxs)("div",{children:[Object(V.jsxs)("h2",{children:["Rolling Retention 7 day: ","".concat(e.calculatedRR7Value,"%")]}),Object(V.jsx)(z,{seriesData:d,categories:n})]}):null}var z=function(e){Object(p.a)(a,e);var t=Object(x.a)(a);function a(e){var r;return Object(O.a)(this,a),(r=t.call(this,e)).state={options:{chart:{id:"basic-bar"},xaxis:{categories:[]}},series:[{name:"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439",data:[]}]},r}return Object(f.a)(a,[{key:"componentDidUpdate",value:function(e){var t=this.props,a=t.seriesData,r=t.categories,n=this.state.series;console.log(a,n[0].data),T(a,n[0].data)||this.setState({options:Object(R.a)(Object(R.a)({},this.state.options),{},{xaxis:Object(R.a)(Object(R.a)({},this.state.options.xaxis),{},{categories:r})}),series:[{name:this.state.series.name,data:a}]})}},{key:"render",value:function(){return Object(V.jsx)("div",{className:"app",children:Object(V.jsx)("div",{className:"row",children:Object(V.jsx)("div",{className:"mixed-chart",children:Object(V.jsx)(J.a,{options:this.state.options,series:this.state.series,type:"bar",width:"1000"})})})})}}]),a}(n.a.Component);var L=function(){return Object(V.jsxs)("div",{className:"App",children:[Object(V.jsx)("h2",{children:"\u0422\u0435\u0441\u0442\u043e\u0432\u043e\u0435 abtest"}),Object(V.jsx)(N,{}),Object(V.jsx)(X,{})]})};a(232),a(233);s.a.render(Object(V.jsx)(c.a,{store:v,children:Object(V.jsx)(L,{})}),document.getElementById("root"))}},[[234,1,2]]]);
//# sourceMappingURL=main.f9e8e534.chunk.js.map