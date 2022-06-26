export default function swipe(
  node: HTMLElement,
  options = { threshX: 0, threshY: 0, touchThreshX: 0, touchThreshY: 0 }
) {
  let x;
  let y;
  let isTouch = false;
  let initial = {
    x: undefined,
    y: undefined,
  };
  let direction = {
    x: undefined,
    y: undefined,
  };

  function handleMousedown(event) {
    const clientX = event?.clientX || event.touches?.[0]?.clientX;
    const clientY = event?.clientY || event.touches?.[0]?.clientY;
    x = clientX;
    y = clientY;
    if (!event.clientX) {
      isTouch = true;
    }
    initial.x = clientX;
    initial.y = clientY;

    node.dispatchEvent(
      new CustomEvent('swipeStart', {
        detail: { x, y },
      })
    );

    window.addEventListener('mousemove', handleMousemove);
    node.addEventListener('touchmove', handleMousemove);
    window.addEventListener('mouseup', handleMouseup);
    node.addEventListener('touchend', handleMouseup);
  }

  function handleMousemove(event) {
    const clientX = event?.clientX || event.touches?.[0]?.clientX;
    const clientY = event?.clientY || event.touches?.[0]?.clientY;
    const dx = clientX - x;
    const dy = clientY - y;
    x = clientX;
    y = clientY;
    (direction.x =
      x - initial.x > options.threshX
        ? 'right'
        : initial.x - x > options.threshX
        ? 'left'
        : undefined),
      (direction.y =
        y - initial.y > options.threshY
          ? 'down'
          : initial.y - y > options.threshY
          ? 'up'
          : undefined);
    node.dispatchEvent(
      new CustomEvent('swipeMove', {
        detail: { x, y, dx, dy, initial, direction },
      })
    );
  }

  function handleMouseup(event) {
    const clientX = event?.clientX || event.touches?.[0]?.clientX || x;
    const clientY = event?.clientY || event.touches?.[0]?.clientY || y;
    x = clientX;
    y = clientY;
    const threshY = isTouch ? options.touchThreshY || options.threshY : options.threshY;
    const threshX = isTouch ? options.touchThreshX || options.threshX : options.threshX;
    if (initial.y - y >= threshY) {
      node.dispatchEvent(
        new CustomEvent('swipeUp', {
          detail: { x, y, initial, direction },
        })
      );
    }
    if (y - initial.y >= threshY) {
      node.dispatchEvent(
        new CustomEvent('swipeDown', {
          detail: { x, y, initial, direction },
        })
      );
    }
    if (initial.x - x >= threshX) {
      node.dispatchEvent(
        new CustomEvent('swipeRight', {
          detail: { x, y, initial, direction },
        })
      );
    }
    if (x - initial.x >= threshX) {
      node.dispatchEvent(
        new CustomEvent('swipeLeft', {
          detail: { x, y, initial, direction },
        })
      );
    }

    node.dispatchEvent(
      new CustomEvent('swipeEnd', {
        detail: { x, y, initial, direction },
      })
    );

    window.removeEventListener('mousemove', handleMousemove);
    node.removeEventListener('touchmove', handleMousemove);
    window.removeEventListener('mouseup', handleMouseup);
    node.removeEventListener('touchend', handleMouseup);
    isTouch = false;
  }

  node.addEventListener('mousedown', handleMousedown);
  node.addEventListener('touchstart', handleMousedown);

  return {
    destroy() {
      node.removeEventListener('mousedown', handleMousedown);
      node.removeEventListener('touchstart', handleMousedown);
    },
  };
}
