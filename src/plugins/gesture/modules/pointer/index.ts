/* eslint-disable */
import { passive } from '@/plugins/polyfills'
import PointerGestureVue from './vue'

export type PointerEvent = MouseEvent | TouchEvent

export interface PointerGestureOptions {
  threshold: number
}

export default class PointerGesture extends PointerGestureVue {
  onLeaveHandler = this.onLeave.bind(this)
  onStartHandler = this.onStart.bind(this)
  onMoveHandler = this.onMove.bind(this)
  onEndHandler = this.onEnd.bind(this)

  options!: PointerGestureOptions
  
  time = { now: 0, last: 0 }
  start = { x: 0, y: 0 }
  prevDir = { x: 0, y: 0 }
  nextDir = { x: 0, y: 0 }
  lockAxis = null

  constructor (options?: Partial<PointerGestureOptions>) {
    super()

    document.addEventListener('mouseleave', this.onLeaveHandler, passive)
    document.addEventListener('mousedown', this.onStartHandler, passive)
    document.addEventListener('mousemove', this.onMoveHandler, passive)
    document.addEventListener('mouseup', this.onEndHandler, passive)

    document.addEventListener('touchstart', this.onStartHandler, passive)
    document.addEventListener('touchmove', this.onMoveHandler, passive)
    document.addEventListener('touchend', this.onEndHandler, passive)

    this.options = {
      threshold: 4,
      ...options,
    }
  }

  sync (event: any) {
    this.client.x = event.touches ? event.touches[0].clientX : event.clientX
    this.client.y = event.touches ? event.touches[0].clientY : event.clientY

    this.normalized.x = (this.client.x / window.innerWidth) * 2 - 1
    this.normalized.y = (this.client.y / window.innerHeight) * 2 - 1
  }

  syncDist () {
    this.dist.x = this.client.x - this.start.x
    this.dist.y = this.client.y - this.start.y
  }

  onStart (event: PointerEvent) {
    this.sync(event)

    this.dragging = true
    this.time.now = Date.now()
    this.start = { ...this.client }
    this.dist = { x: 0, y: 0 }

    this.dispatchEvent('start', {
      start: this.start,
      event,
    })
  }
  
  onMove (event: PointerEvent) {
    this.sync(event)
    this.dispatchEvent('move', {
      normalized: this.normalized,
      client: this.client,
      event,
    })

    if (!this.dragging) return

    this.syncDist()
    this.dispatchEvent('drag', {
      event,
      direction: {
        x: this.dist.x > 0 ? -1 : 1,
        y: this.dist.y > 0 ? -1 : 1 
      }
    })
  }

  onEnd (event: PointerEvent) {
    this.syncDist()

    const clicked = this.validateClick()
    const { x, y } = this.validateSwipe()
    
    this.prevDir = { ...this.nextDir }
    this.nextDir = {
      x: this.dist.x > 0 ? -1 : 1,
      y: this.dist.y > 0 ? -1 : 1 
    }

    const changed = {
      x: this.prevDir.x != this.nextDir.x,
      y: this.prevDir.y != this.nextDir.y,
    }

    const direction = { 
      ...this.nextDir
    }
    
    if (clicked)
      this.dispatchEvent('click')
    else if (x || y)
      this.dispatchEvent('swipe', {
        input: 'pointer',
        changed: changed.y,
        axis: { x, y },
        direction,
        event,
      })

    this.clear()
  }

  onLeave () {
    this.clear()
  }

  clear () {
    this.dragging = false
    this.lockAxis = null
  }

  validateDrag () {
    const distX = Math.abs(this.dist.x)
    const distY = Math.abs(this.dist.y)
    return {
      x: distX > distY && distX > this.options.threshold,
      y: distY > distX && distY > this.options.threshold,
    }
  }

  validateSwipe () {
    const validateDrag = this.validateDrag()
    const duration = Date.now() - this.time.now
    return {
      x: validateDrag.x && duration < 600, // && this.mobile
      y: validateDrag.y && duration < 600, // && this.mobile
    }
  }

  validateClick () {
    const distX = Math.abs(this.dist.x)
    const distY = Math.abs(this.dist.y)
    return distX < this.options.threshold && distY < this.options.threshold
  }

  dispose () {
    document.removeEventListener('mouseleave', this.onLeaveHandler)
    document.removeEventListener('mousedown', this.onStartHandler)
    document.removeEventListener('mousemove', this.onMoveHandler)
    document.removeEventListener('mouseup', this.onEndHandler)

    document.removeEventListener('touchstart', this.onStartHandler)
    document.removeEventListener('touchmove', this.onMoveHandler)
    document.removeEventListener('touchend', this.onEndHandler)
  }
}