import { tracked } from '@glimmer/tracking';
import { cached } from 'tracked-toolbox';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assign } from '@ember/polyfills';
import { getOwner } from '@ember/application';
import { guidFor } from '@ember/object/internals';

export default class SwiperComponent extends Component {
  elementId = guidFor(this);

  @tracked
  swiper;

  @cached
  get _config() {
    const config =
      getOwner(this).resolveRegistration('config:environment') || {};

    return config['ember-swiper7'] || {};
  }

  @cached
  get _options() {
    const options = {};

    assign(options, this._config, this._componentOptions);

    return options;
  }

  @cached
  get _componentOptions() {
    const options = {};

    Object.keys(this.args).forEach((option) => {
      const _option = this.args[option];

      if (typeof _option === 'object') {
        options[option] = Object.assign({}, _option);
      } else {
        options[option] = _option;
      }
    });

    return options;
  }

  @action
  _initializeOptions(element) {
    import('swiper').then((module) => {
      const slideEvents = [
        'slideChange',
        'slideChangeTransitionStart',
        'slideChangeTransitionEnd',
        'slideNextTransitionStart',
        'slideNextTransitionEnd',
        'slidePrevTransitionStart',
        'slidePrevTransitionEnd',
      ];

      if (this._options.on) {
        slideEvents.forEach((eventName) => {
          if (
            this._options.on[eventName] &&
            typeof this._options.on[eventName] === 'function'
          ) {
            delete this._options.on[eventName];
          }
        });
      }

      this._options.modules = [];
      const importedModules = this._config['imports'];

      if (
        !importedModules ||
        importedModules === '*' ||
        importedModules === ['*']
      ) {
        Object.keys(module).forEach((key) => {
          if (key !== 'default' && key !== 'Swiper') {
            this._options.modules.push(module[key]);
          }
        });
      } else {
        Object.keys(module).forEach((key) => {
          if (key !== 'default' && key !== 'Swiper') {
            importedModules.forEach((i) => {
              if (module[key].name === i) {
                this._options.modules.push(module[key]);
              }
            });
          }
        });
      }

      delete this._options.imports;

      const Swiper = module.Swiper;

      this.swiper = new Swiper(element, this._options);

      if (this.args.on) {
        slideEvents.forEach((eventName) => {
          if (
            this.args.on[eventName] &&
            typeof this.args.on[eventName] === 'function'
          ) {
            this.swiper.on(eventName, () => {
              this.args.on[eventName](this.swiper);
            });
          }
        });
      }
    });
  }

  @action
  _updateOptions() {
    this.swiper?.update();
  }

  @action
  _destroyOptions() {
    this.swiper?.destroy();
  }
}
