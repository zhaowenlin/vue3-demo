import { provide, inject, reactive, readonly as defineReadonly, defineComponent } from 'vue';
export function createContext(context, key, options) {
  if (key === void 0) {
    key = Symbol();
  }

  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$readonly = _options.readonly,
      readonly = _options$readonly === void 0 ? true : _options$readonly,
      _options$createProvid = _options.createProvider,
      createProvider = _options$createProvid === void 0 ? false : _options$createProvid,
      _options$native = _options.native,
      native = _options$native === void 0 ? false : _options$native;
  var state = reactive(context);
  var provideData = readonly ? defineReadonly(state) : state;
  !createProvider && provide(key, native ? context : provideData);
  var Provider = createProvider ? defineComponent({
    name: 'Provider',
    inheritAttrs: false,
    setup: function setup(_, _ref) {
      var slots = _ref.slots;
      provide(key, provideData);
      return function () {
        return slots.default == null ? void 0 : slots.default();
      };
    }
  }) : null;
  return {
    Provider: Provider,
    state: state
  };
}
export function useContext(key, defaultValue) {
  if (key === void 0) {
    key = Symbol();
  }

  var val = inject(key, defaultValue || {});
  return val;
}