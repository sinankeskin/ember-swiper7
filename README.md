# ember-swiper7

Ember addon for [Swiper](https://swiperjs.com/) slider v7 library.

## Compatibility

* Ember.js v3.28 or above
* Ember CLI v3.28 or above
* Node.js v14 or above


## Installation

```
ember install ember-swiper7
```

## Compatibility

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above

## Usage

You can change all global configuration settings via `config/environment.js` file.

Please check [Swiper](https://swiperjs.com/api/) site for more configuration details.

```javascript
ENV['ember-swiper7'] = {
  speed: 450,
  loop: true, // etc
};
```

You can import only modules you want.

NOTICE: All module names are case-sensitive.

Available module names:

- A11y
- Autoplay
- Controller
- EffectCards
- EffectCoverflow
- EffectCreative
- EffectCube
- EffectFade
- EffectFlip
- FreeMode
- Grid
- HashNavigation
- History
- Keyboard
- Lazy
- Manipulation
- Mousewheel
- Navigation
- Pagination
- Parallax
- Scrollbar
- Thumb
- Virtual
- Zoom

```javascript
ENV['ember-swiper7'] = {
  imports: '*', // or ["*"] for every modules
};
```

```javascript
ENV['ember-swiper7'] = {
  imports: ['A11y', 'Pagination', 'Navigation'], // only these modules
};
```

Default configuration

```handlebars
<Swiper as |swiper|>
  <swiper.slide> // or not contextual Swiper::Slide
    Slide 1
  </swiper.slide>
  <swiper.slide>
    Slide 2
  </swiper.slide>
  <swiper.slide>
    Slide 3
  </swiper.slide>
</Swiper>
```

Full configuration

```handlebars
<Swiper
  @loop={{false}}
  @speed={{400}}
  @spaceBetween={{100}}
  @scrollbar={{hash el='.swiper-scrollbar' hide=true}}
  @on={{hash init=(fn this.log)}} as |swiper|
>
  <!-- Block component for slides -->
  <swiper.slide>
    Slide 1
  </swiper.slide>
  <swiper.slide>
    Slide 2
  </swiper.slide>
  <swiper.slide>
    Slide 3
  </swiper.slide>
  <!-- If you use @pagination parameter you must use swiper.pagination component. Otherwise it won't show. -->
  <swiper.pagination />
  <!-- If you want to change the defaults use swiper.pagination component with block. -->
  <swiper.pagination>
    <div class="my-swiper-pagination"></div>
  </swiper.pagination>
  <!-- Same as @pagination -->
  <swiper.navigation />
  <!-- Same as @pagination -->
  <swiper.scrollbar />
  <!-- If you want to reach the instance you should use swiper.header or swiper.footer component. This yields the instance. -->
  <!-- swiper.content component is deprecated now. -->
  <!-- swiper.header will place before the slider no matter where you put. -->
  <!-- swiper.footer will place after the slider no matter where you put. -->
  <!-- That way you can reach all parameters and invoke methods like slideTo etc... -->
  <swiper.header as |self|>
    <button type="button" {{on 'click' (fn this.slideTo self)}}>
      Move
    </button>
  </swiper.header>
  <swiper.footer as |self|>
    <button type="button" {{on 'click' (fn this.slideTo self)}}>
      Move
    </button>
  </swiper.footer>
</Swiper>
```

All slideXXX events returns swiper instance. That way you can reach all properties like realIndex etc...

> Note: If you use sass or less; ember-swiper7 will be imported automatically.

> In ember-swiper7 file; after the //IMPORT_COMPONENTS line you should import the component(s) you need.

> Ex: For scrollbar: @import './components/scrollbar/scrollbar'; etc...

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
