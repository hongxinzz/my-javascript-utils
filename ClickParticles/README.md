 ## 点击粒子爆炸效果  
 
>  [Demo](https://hongxinzz.github.io/my-javascript-utils/ClickParticles)
## canvas做的粒子动画  
  
>  [Demo](https://hongxinzz.github.io/my-javascript-utils/canvas/canvas.html)

 ### API
 TabParticles(opts)
 - opts (Object), optional
   - colors (Array) 小球得随机颜色 (默认：`['#FF1461', '#18FF92', '#5A87FF', '#FBF38C']`)
   - numberOfParticles (Number) 生成的粒子数量 (默认：`40`)
   - canvasClassName (String)  生成Canvas的ClassName  (默认：`zParticles`)
   - maxRange (Number) 小球的爆炸范围 (默认 `100`)
   - width (Number) 小球的默认宽度 (默认 `20`)

### 例子
```js
//只生成小球

var tabParticles = new TabParticles();
```
```js
//完整配置

var tabParticles = new TabParticles({
				colors:['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'],
				numberOfParticles:40,
				canvasClassName:'TabParticles',
				maxRange:100,
				width:20,
			});
```
### Demo
![初始化](https://raw.githubusercontent.com/hongxinzz/my-javascript-utils/master/ClickParticles/ClickParticles.gif)
