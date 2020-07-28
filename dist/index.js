!function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);var n=[500,2e3],r=[.05,.25];function a(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var o=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.x=e,this.y=i,this.scaleX=0,this.scaleY=0,this.state=t.VALUE.NONE,this.value=t.VALUE.NONE}var e,i,n;return e=t,n=[{key:"getGraphics",value:function(e){if(!t.BUFFER[e]){var i=document.createElement("canvas");i.width=i.height=6;var n=i.getContext("2d");n.fillStyle=e==t.VALUE.PLAYER_1?"#ffffff":"#000000",n.beginPath(),n.arc(3,3,3,0,2*Math.PI),n.fill(),t.BUFFER[e]=i}return t.BUFFER[e]}}],(i=[{key:"draw",value:function(e){if(this.state!=t.VALUE.NONE){var i=t.getGraphics(this.state),n=i.width*(1-this.scaleX)*.5,r=i.height*(1-this.scaleY)*.5;e.drawImage(i,this.x+n,this.y+r,i.width*this.scaleX,i.height*this.scaleY)}}}])&&a(e.prototype,i),n&&a(e,n),t}();function s(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}o.BUFFER={},o.VALUE={NONE:0,PLAYER_1:1,PLAYER_2:2};var h=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.width=e,this.height=i}var e,i,n;return e=t,(i=[{key:"draw",value:function(t,e,i){t.globalAlpha=1,t.lineWidth=1,t.strokeStyle="#8c2e2e",t.beginPath();for(var n=0;n<9;n++)t.moveTo(.5+9*n,0),t.lineTo(.5+9*n,73),t.moveTo(0,.5+9*n),t.lineTo(73,.5+9*n);t.stroke(),t.fillStyle=e==o.VALUE.PLAYER_1?"#ffffff":"#000000",i.forEach((function(e){t.globalAlpha=r[0]+(r[1]-r[0])*e.weightMax,t.fillRect(8*e.x+1*(e.x+1),8*e.y+1*(e.y+1),8,8)})),t.globalAlpha=1}}])&&s(e.prototype,i),n&&s(e,n),t}();function c(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var l=function(){function t(e,i,n,r,a,o,s){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.obj=e,this.prop=i,this.duration=r,this.ease=o,this.from=e[i],this.to=n,this.time=-a,this.per=0,this.onComplete=s}var e,i,n;return e=t,(i=[{key:"update",value:function(t){this.time+=t,this.per=Math.max(0,Math.min(1,this.time/this.duration)),this.obj[this.prop]=this.from+(this.to-this.from)*this.ease(this.per),1==this.per&&this.onComplete&&this.onComplete(this)}}])&&c(e.prototype,i),n&&c(e,n),t}();function u(t){return function(t){if(Array.isArray(t))return f(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return f(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);"Object"===i&&t.constructor&&(i=t.constructor.name);if("Map"===i||"Set"===i)return Array.from(t);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return f(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function v(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}l.EASE={LINEAR:function(t){return t},IN_QUAD:function(t){return t*t},OUT_QUAD:function(t){return t*(2-t)},INOUT_QUAD:function(t){return t<.5?2*t*t:(4-2*t)*t-1}};var p=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.main=e}var e,i,n;return e=t,(i=[{key:"doMove",value:function(e,i,n){var r=this,a=this.getChip(e,i),s=!1;return a.value==o.VALUE.NONE&&(Object.keys(t.DIRECTION).forEach((function(a){for(var h=t.DIRECTION[a],c=e+h.X,u=i+h.Y,f=r.getChip(c,u),v=f,p=[];f&&f.value!=o.VALUE.NONE&&f.value!=n;)p.push(f),c+=h.X,u+=h.Y,f=r.getChip(c,u);f&&f!=v&&f.value==n&&(p.forEach((function(t,e){var i=Math.random()>.5?"scaleX":"scaleY";r.main.animations.push(new l(t,i,0,100,100*e,l.EASE.IN_QUAD,(function(){t.state=n,r.main.animations.push(new l(t,i,1,100,0,l.EASE.OUT_QUAD))}))),t.value=n})),s=!0)})),s&&(a.state=a.value=n,this.main.animations.push(new l(a,"scaleX",1,100,0,l.EASE.LINEAR)),this.main.animations.push(new l(a,"scaleY",1,100,0,l.EASE.LINEAR))),s)}},{key:"getValidMoves",value:function(e){var i=this,n=[];this.main.chips.forEach((function(r,a){r.forEach((function(r,s){r.value==o.VALUE.NONE&&Object.keys(t.DIRECTION).forEach((function(r){for(var h=t.DIRECTION[r],c=s+h.X,l=a+h.Y,u=i.getChip(c,l),f=u,v=[];u&&u.value!=o.VALUE.NONE&&u.value!=e;)v.push(u),c+=h.X,l+=h.Y,u=i.getChip(c,l);if(u&&u!=f&&u.value==e){var p=n.find((function(t){return t[0]==s&&t[1]==a}));p?p[2]+=v.length:n.push({x:s,y:a,captures:v.length})}}))}))}));var r=Math.max.apply(Math,u(n.map((function(t){return t.captures}))).concat([0])),a=n.reduce((function(t,e){return t+e.captures}),0);return n.forEach((function(t){t.weightMax=t.captures/r,t.weightTotal=t.captures/a})),n}},{key:"getChip",value:function(t,e){return this.main.chips[e]&&this.main.chips[e][t]}},{key:"getScore",value:function(t){var e=0;return this.main.chips.forEach((function(i){return i.forEach((function(i){i.value==t&&e++}))})),e}}])&&v(e.prototype,i),n&&v(e,n),t}();function y(t){return function(t){if(Array.isArray(t))return m(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return m(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);"Object"===i&&t.constructor&&(i=t.constructor.name);if("Map"===i||"Set"===i)return Array.from(t);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return m(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function d(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}p.DIRECTION={LEFT:{X:-1,Y:0},TOP_LEFT:{X:-1,Y:-1},TOP:{X:0,Y:-1},TOP_RIGHT:{X:1,Y:-1},RIGHT:{X:1,Y:0},BOTTOM_RIGHT:{X:1,Y:1},BOTTOM:{X:0,Y:1},BOTTOM_LEFT:{X:-1,Y:1}};var E=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.playing=!1,this.delay=0,this.move=null}var e,i,n;return e=t,(i=[{key:"getMove",value:function(t,e,i,n){this.playing=!0,this.delay=i[0]+Math.random()*(i[1]-i[0]);var r=Math.max.apply(Math,y(t.map((function(t){return t.weightMax}))).concat([0])),a=t[0];switch(e){case"random":a=t[Math.floor(Math.random()*t.length)];break;case"weighted_random":for(var o=0,s=t.map((function(t){var e=Math.pow(t.weightTotal,5);return o+=e,e})),h=Math.random()*o,c=0,l=0;l<t.length;l++)if(h<=(c+=s[l])){a=t[l];break}break;case"max_weight":var u=t.filter((function(t){return t.weightMax==r}));a=u[Math.floor(Math.random()*u.length)]}this.move={x:a.x,y:a.y,callback:n}}},{key:"update",value:function(t){this.playing&&(this.delay-=t,this.delay<=0&&(this.playing=!1,this.move.callback(this.move.x,this.move.y)))}}])&&d(e.prototype,i),n&&d(e,n),t}();function g(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}new(function(){function t(){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),n[0]>n[1])throw Error("Invalid AI move delay");if(r[0]>r[1])throw Error("Invalid hint alpha");this.canvas=document.querySelector("#canvas"),this.ctx=this.canvas.getContext("2d"),this.ctx.imageSmoothingEnabled=!1,this.canvas.width=73,this.canvas.height=this.canvas.width+2+1,this.gameloop=this.update.bind(this),this.prevTime=0,this.winner=null,this.animations=[],this.validMoves=[],this.score={animation:null,ratio:.5},this.currPlayer=o.VALUE.PLAYER_1,this.logic=new p(this),this.ai=new E,this.grid=new h(this.canvas.width,this.canvas.height),this.chips=new Array(8).fill(null).map((function(t,e){return new Array(8).fill(null).map((function(t,i){return new o(8*i+1*(i+1)+1,8*e+1*(e+1)+1)}))})),this.reset(),this.canvas.addEventListener("click",this.click.bind(this)),window.addEventListener("resize",this.resize.bind(this)),document.body.style.backgroundColor="#cc4d4d",this.resize(),this.gameloop(0)}var e,i,a;return e=t,(i=[{key:"reset",value:function(){this.currPlayer=o.VALUE.PLAYER_1,this.winner=null,this.chips.forEach((function(t){return t.forEach((function(t){return t.value=t.state=o.VALUE.NONE}))}));var t=this.chips[3][3];t.state=t.value=o.VALUE.PLAYER_1,t.scaleX=t.scaleY=1;var e=this.chips[3][4];e.state=e.value=o.VALUE.PLAYER_2,e.scaleX=e.scaleY=1;var i=this.chips[4][4];i.state=i.value=o.VALUE.PLAYER_1,i.scaleX=i.scaleY=1;var n=this.chips[4][3];n.state=n.value=o.VALUE.PLAYER_2,n.scaleX=n.scaleY=1,this.score.ratio=.5,this.score.animation=null,this.validMoves=this.logic.getValidMoves(this.currPlayer),this.checkAIMove()}},{key:"click",value:function(t){if(t&&t.preventDefault(),!this.ai.playing){if(this.winner)return this.reset();var e=Math.max(0,Math.min(Math.floor((t.offsetX-.5)/9),7)),i=Math.max(0,Math.min(Math.floor((t.offsetY-.5)/9),7));this.logic.doMove(e,i,this.currPlayer)&&this.onMoved()}}},{key:"checkAIMove",value:function(){var t=this;this.currPlayer,o.VALUE.PLAYER_1,this.currPlayer==o.VALUE.PLAYER_2&&this.ai.getMove(this.validMoves,this.currPlayer==o.VALUE.PLAYER_1?"random":"weighted_random",n,(function(e,i){t.logic.doMove(e,i,t.currPlayer),t.onMoved()}))}},{key:"onMoved",value:function(){this.currPlayer=this.currPlayer==o.VALUE.PLAYER_1?o.VALUE.PLAYER_2:o.VALUE.PLAYER_1,this.validMoves=this.logic.getValidMoves(this.currPlayer);var t=this.logic.getScore(o.VALUE.PLAYER_1),e=this.logic.getScore(o.VALUE.PLAYER_2);this.validMoves.length?this.checkAIMove():this.winner=t==e?o.VALUE.NONE:t>e?o.VALUE.PLAYER_1:o.VALUE.PLAYER_2,this.score.animation=new l(this.score,"ratio",t/(t+e),500,0,l.EASE.INOUT_QUAD)}},{key:"update",value:function(t){var e=this,i=t-this.prevTime;this.prevTime=t,this.ai.update(i),this.animations.forEach((function(t){return t.update(i)})),this.animations=this.animations.filter((function(t){return t.per<1})),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.grid.draw(this.ctx,this.currPlayer,this.validMoves),this.chips.forEach((function(t){return t.forEach((function(t){return t.draw(e.ctx)}))})),this.score.animation&&(this.score.animation.update(i),this.score.animation.per>=1&&(this.score.animation=null));var n=Math.round((this.canvas.width-2)*this.score.ratio);this.ctx.lineWidth=1,this.ctx.strokeStyle="#ffffff",this.winner!=o.VALUE.PLAYER_1&&this.winner!=o.VALUE.NONE||(this.ctx.globalAlpha=.5*(1+Math.sin(t/100))),this.ctx.beginPath(),this.ctx.moveTo(1,this.canvas.height-1+.5),this.ctx.lineTo(1+n,this.canvas.height-1+.5),this.ctx.stroke(),this.ctx.globalAlpha=1,this.ctx.strokeStyle="#000000",this.winner!=o.VALUE.PLAYER_2&&this.winner!=o.VALUE.NONE||(this.ctx.globalAlpha=.5*(1+Math.sin(t/100))),this.ctx.beginPath(),this.ctx.moveTo(1+n,this.canvas.height-1+.5),this.ctx.lineTo(this.canvas.width-1,this.canvas.height-1+.5),this.ctx.stroke(),this.ctx.globalAlpha=1,requestAnimationFrame(this.gameloop)}},{key:"resize",value:function(){var t=.9*window.innerWidth/this.canvas.width,e=.9*window.innerHeight/this.canvas.height,i=Math.min(t,e);i=Math.min(5,i),this.canvas.style.transform="scale(".concat(i,")")}}])&&g(e.prototype,i),a&&g(e,a),t}())}]);