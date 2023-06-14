import { animate, AnimationTriggerMetadata, AUTO_STYLE, style, transition, trigger } from '@angular/animations';

export function slideInOutY(duration: number = 200): AnimationTriggerMetadata {
  return trigger('slideInOutY', [
    transition(':enter', [
      style({ transform: 'translateY(-100%)' }),
      animate(duration + 'ms ease-out', style({ transform: 'translateY(0%)' }))
    ]),
    transition(':leave', [animate(duration + 'ms ease-out', style({ transform: 'translateY(-100%)' }))])
  ]);
}

export function slideOutInY(duration: number = 200): AnimationTriggerMetadata {
  return trigger('slideOutInY', [
    transition(':enter', [
      style({ transform: 'translateY(100%)' }),
      animate(duration + 'ms ease-out', style({ transform: 'translateY(0%)' }))
    ]),
    transition(':leave', [animate(duration + 'ms ease-out', style({ transform: 'translateY(100%)' }))])
  ]);
}

export function slideInOutX(duration: number = 200): AnimationTriggerMetadata {
  return trigger('slideInOutX', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate(duration + 'ms ease-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [animate(duration + 'ms ease-out', style({ transform: 'translateX(-100%)' }))])
  ]);
}

export function slideInOutXBounce(duration: number = 200): AnimationTriggerMetadata {
  return trigger('slideInOutXBounce', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate(duration + 'ms ease-out', style({ transform: 'translateX(2rem)' })),
      animate(duration + 'ms ease-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [animate(duration + 'ms ease-out', style({ transform: 'translateX(-100%)' }))])
  ]);
}

export function slideOutInX(duration: number = 200): AnimationTriggerMetadata {
  return trigger('slideOutInX', [
    transition(':enter', [
      style({ transform: 'translateX(100%)' }),
      animate(duration + 'ms ease-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [animate(duration + 'ms ease-out', style({ transform: 'translateX(100%)' }))])
  ]);
}

export function zoomIn(duration: number = 200): AnimationTriggerMetadata {
  return trigger('zoomIn', [
    transition(':enter', [style({ transform: 'scale(0)' }), animate(duration + 'ms ease-out', style({ transform: 'scale(1)' }))])
  ]);
}

export function zoomInOut(duration: number = 200): AnimationTriggerMetadata {
  return trigger('zoomInOut', [
    transition(':enter', [style({ transform: 'scale(0)' }), animate(duration + 'ms ease-out', style({ transform: 'scale(1)' }))]),
    transition(':leave', [animate(duration + 'ms ease-out', style({ transform: 'scale(0)' }))])
  ]);
}

export function expandInOut(duration: number = 200): AnimationTriggerMetadata {
  return trigger('expandInOut', [
    transition(':enter', [style({ height: 0 }), animate(duration + 'ms ease-out', style({ height: AUTO_STYLE }))]),
    transition(':leave', [animate(duration + 'ms ease-out', style({ height: 0 }))])
  ]);
}

export function expandInOutX(duration: number = 200): AnimationTriggerMetadata {
  return trigger('expandInOutX', [
    transition(':enter', [style({ width: 0 }), animate(duration + 'ms ease-out', style({ width: AUTO_STYLE }))]),
    transition(':leave', [animate(duration + 'ms ease-out', style({ width: 0 }))])
  ]);
}

export function fadeInOut(duration: number = 200): AnimationTriggerMetadata {
  return trigger('fadeInOut', [
    transition(':enter', [style({ opacity: 0 }), animate(duration + 'ms ease-out', style({ opacity: 1 }))]),
    transition(':leave', [animate(duration + 'ms ease-out', style({ opacity: 0 }))])
  ]);
}
