# p5.stagger.js
A straight simple staggering class built around p5.js


![example](https://github.com/amehowc/p5.stagger.js/assets/38710749/f93c4f72-f32a-4352-9da2-cc345b76df32)



## A GSAP-inspired, frame-agnostic, no-dependency, highly customizable stagger

I found myself in the need to have a reliable staggering effect for my own usage so i built this little helper, it was kinda messy until i found the time to clean it and simplify it.

It does what is says, given a n-number of items, the class will produce and update an array of objects with their respective progress [0-1] given a global progress [0-1]. It was built with p5.js in mind but it could be to animate anything since it doesn't depend on frames.

Not typeScript or React ready, but it's on my to-do.

## Usage
The animations are represented as javaScript object and stored in an array `.animations`. The setup in pretty bare for the purpose of being as versatile as possible. Unlike GSAP with many animation presets and easing (even though a basic easing function is ingrated), you're left on your own to come up with a way to evaluate what the `progress` of the animation will be.

i.e. : if you need to ping-pong between two state, you can do something like this in p5.js
```js
 const stagger = new Stagger(num : number, offset : number)
```

## Methods
### Stagger class constructor

Create the stagger class.

```js
 const stagger = new Stagger(num : number, offset : number, initialize : boolean)
```

Note : The class build a first array of animations when constructed, if you want to prevent that, you can set the initialize value to `false`. You will then have to build the setup. See the `stagger.bluid()` function below. This also works if wou want to update the number of element or their offset at runtime

### Stagger.animations

The animations are stored as object in an array. 
( No, i didn't wanted to create a class for those since the setup is pretty straight forward, let me know if i should )
```js
 const animation = stagger.animations : array[{progress : number}]
```


To get the elements progress, you can iterate over the array

```js
 for(let i =0 ; i<stagger.num; i++){
    const animation = stagger.animations[i]
    const progress = animation.progress
 }
```
or
```js
 for(let animation of stagger.animations){
    const progress = animation.progress
 }
```

### Stagger.update()

Update the animation. The stagger takes a `normalized` input between 0 and 1.

```js
 stagger.update(progress:number[0..1])
```
The easiest way to get that value in p5.js is something like this :
```js
 const numberOfFrames = 3 * 60
 const time = (frameCount / numberOfFrames) % 1
 stagger.update(time)
```
But you can also update it from a slider
```js
 let slider = createSlider(0,1,0,0.001)
 stagger.update(slider.value())
```
Or pretty much anything you can think of
```js
 let progress = (element.scrollTop/element.getBoundingRect().height)
 stagger.update(progress)
```
The p5.js `map()` function comes pretty handy in this case ( don't forget to add the `true`, so you get a clamped value, but it's not mandatory and can get pretty nuts when overshooted depending on what you're doing )
```js
 let progress = p5.map(value, -100, 100, 0, 1, true)
 stagger.update(progress)
```
### Stagger.build()

The build function is called internally when the class is initialized. It can be used to change the number or the offset of all the elements dynamically. The progress will not be affected by this.

```js
 stagger.build(num : number, offser : number)
```

### Stagger.revert()

This method is used to invert the order of the items in the array dynamically by redifining their index values. It's usefull when you need to switch between front-to-back to back-to-front dynamically

```js
 stagger.revert(revert : boolean)
```
### Stagger.ease()

A simple in-out easing helper in case you forgot to bring your own 

```js
 stagger.ease(value : number, slope : number)
```
