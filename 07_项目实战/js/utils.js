function throttle(
  fn,
  interval = 400,
  options = { leading: true, trailing: true }
) {
  const { leading, trailing } = options;
  let lastTime = 0;
  let timer = null;

  const _throttle = function (...args) {
    const nowTime = new Date().getTime();
    const remainTime = interval - (nowTime - lastTime);
    if (remainTime <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(this, args);
      lastTime = nowTime;
      return;
    }

    if (trailing && !timer) {
      timer = setTimeout(() => {
        timer = null;
        lastTime = !leading ? 0 : new Date().getTime();
        fn.apply(this, args);
      }, remainTime);
    }
  };
  return _throttle;
}
