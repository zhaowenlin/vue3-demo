import { watch, computed, getCurrentInstance, onMounted, onUnmounted, nextTick, reactive } from 'vue';
import { error } from "../log";
export function explicitComputed(source, fn) {
  var v = reactive({
    value: fn()
  });
  watch(source, function () {
    return v.value = fn();
  });
  return computed(function () {
    return v.value;
  });
}
export function tryOnMounted(fn, sync) {
  if (sync === void 0) {
    sync = true;
  }

  if (getCurrentInstance()) {
    onMounted(fn);
  } else if (sync) {
    fn();
  } else {
    nextTick(fn);
  }
}
export function tryOnUnmounted(fn) {
  getCurrentInstance() && onUnmounted(fn);
}
export function tryTsxEmit(fn) {
  var instance = getCurrentInstance();
  instance && fn.call(null, instance);
}
export function isInSetup() {
  if (!getCurrentInstance()) {
    error('Please put useForm function in the setup function!');
  }
}