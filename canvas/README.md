 ## canvas做的粒子动画  
 
>  [Demo](https://hongxinzz.github.io/my-javascript-utils/canvas/canvas.html)
 
## 点击粒子爆炸效果  
  
>  [Demo](https://hongxinzz.github.io/my-javascript-utils/ClickParticles)

 ### API
 DropCanvas(opts)
 - opts (Object), optional
   - ballNum (Number) 默认的小球个数 (默认：`1000`)
   - showText (String) 显示文字 (默认：无)
   - showTextColor (String)  显示文字的颜色 `例：'#ed4040'` (默认为小球的Rgba颜色)
   - initTextFont (String) 显示文字的大小 (默认 `180px`)
   - iniFontFamily (String) 显示canvas的文字字体 (默认 `Arial`)
   - maxSize (Number) 显示小球的最大范围 (默认 `3`) 
   - minSize (Number) 显示小球的最小范围 (默认 `1`)
   - isCanBack (Boolean) 文字展现之后小球是否归位 (默认:`true`)
   - animateEnd(Function) 小球到达指定点的回调函数 (Boolean)

### 例子
```js
//只生成小球

var drop = new DropCanvas({ballNum:2000});
```
```js
//完整配置

var drop = new DropCanvas({
				ballNum:2000,
				showTextColor:'#ed4040',
				showText:'显示文字',
				initTextFont:'100px',
				iniFontFamily:'Arial',
				maxSize:4,
				minSize:1
			});
```
### Demo
![初始化](https://raw.githubusercontent.com/hongxinzz/my-javascript-utils/master/canvas/demo.png)


![有文字](https://raw.githubusercontent.com/hongxinzz/my-javascript-utils/master/canvas/text.png)
