/**
 * web socket
 */
const $ws = {
  /**
   * 机器终端
   */
  terminal: (param) => {
    return `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/orion/keep-alive/machine/terminal/${param.token}`
  },
}

export default $ws
