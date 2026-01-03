/**
 * 终端可选字体
 */
enum FONT_FAMILY {
  /**
   * Lucida Console 字体，经典的等宽字体，在一些旧系统中较为常见。
   */
  LUCIDA_CONSOLE = 'Lucida Console',
  /**
   * Courier New 字体，广泛使用的等宽字体，具有良好的可读性。
   */
  COURIER_NEW = 'Courier New',
  /**
   * Courier 字体，早期的等宽字体，是 Courier New 的前身。
   */
  COURIER = 'Courier',
  /**
   * Consolas 字体，微软开发的等宽字体，常用于代码编辑。
   */
  CONSOLAS = 'Consolas',
  /**
   * Fira Code 字体，专门为代码设计的等宽字体，支持连字效果。
   */
  FIRA_CODE = 'Fira Code',
  /**
   * JetBrains Mono 字体，JetBrains 开发的用于代码编辑的等宽字体。
   */
  JETBRAINS_MONO = 'JetBrains Mono',
  /**
   * Source Code Pro 字体，Adobe 开发的开源等宽字体，适合代码显示。
   */
  SOURCE_CODE_PRO = 'Source Code Pro',
}

/**
 * 终端自定义样式
 */

// 定义终端主题的接口
interface TerminalTheme {
  /**
   * 终端文本的默认前景色，即普通文本显示的颜色。
   */
  foreground?: string
  /**
   * 终端的默认背景色，是整个终端界面的底色。
   */
  background?: string
  /**
   * 终端光标的颜色，用户操作时看到的光标颜色。
   */
  cursor?: string
  /**
   * 光标的强调色，通常用于块光标模式下光标的前景色。
   */
  cursorAccent?: string
  /**
   * 选中文本的背景颜色，当用户选中部分文本时该区域的背景色，可设置为透明。
   */
  selectionBackground?: string
  /**
   * 选中文本的前景颜色，即选中部分文本自身的颜色。
   */
  selectionForeground?: string
  /**
   * 当终端失去焦点时，选中文本的背景颜色，同样可设置为透明。
   */
  selectionInactiveBackground?: string
  /**
   * ANSI 转义序列中黑色的颜色值，对应 `\x1b[30m` 所表示的颜色。
   */
  black?: string
  /**
   * ANSI 转义序列中红色的颜色值，对应 `\x1b[31m` 所表示的颜色。
   */
  red?: string
  /**
   * ANSI 转义序列中绿色的颜色值，对应 `\x1b[32m` 所表示的颜色。
   */
  green?: string
  /**
   * ANSI 转义序列中黄色的颜色值，对应 `\x1b[33m` 所表示的颜色。
   */
  yellow?: string
  /**
   * ANSI 转义序列中蓝色的颜色值，对应 `\x1b[34m` 所表示的颜色。
   */
  blue?: string
  /**
   * ANSI 转义序列中品红色的颜色值，对应 `\x1b[35m` 所表示的颜色。
   */
  magenta?: string
  /**
   * ANSI 转义序列中青色的颜色值，对应 `\x1b[36m` 所表示的颜色。
   */
  cyan?: string
  /**
   * ANSI 转义序列中白色的颜色值，对应 `\x1b[37m` 所表示的颜色。
   */
  white?: string
  /**
   * ANSI 转义序列中亮黑色的颜色值，对应 `\x1b[1;30m` 所表示的颜色。
   */
  brightBlack?: string
  /**
   * ANSI 转义序列中亮红色的颜色值，对应 `\x1b[1;31m` 所表示的颜色。
   */
  brightRed?: string
  /**
   * ANSI 转义序列中亮绿色的颜色值，对应 `\x1b[1;32m` 所表示的颜色。
   */
  brightGreen?: string
  /**
   * ANSI 转义序列中亮黄色的颜色值，对应 `\x1b[1;33m` 所表示的颜色。
   */
  brightYellow?: string
  /**
   * ANSI 转义序列中亮蓝色的颜色值，对应 `\x1b[1;34m` 所表示的颜色。
   */
  brightBlue?: string
  /**
   * ANSI 转义序列中亮品红色的颜色值，对应 `\x1b[1;35m` 所表示的颜色。
   */
  brightMagenta?: string
  /**
   * ANSI 转义序列中亮青色的颜色值，对应 `\x1b[1;36m` 所表示的颜色。
   */
  brightCyan?: string
  /**
   * ANSI 转义序列中亮白色的颜色值，对应 `\x1b[1;37m` 所表示的颜色。
   */
  brightWhite?: string
  /**
   * ANSI 扩展颜色（编号范围为 16 - 255）的颜色值数组，每个元素对应一个扩展颜色。
   */
  extendedAnsi?: string[]
}

// 定义主题类型的枚举
enum THEME_NAME {
  DRACULA = 'Dracula',
  ATOM_LIGHT = 'Atom-light',
  ATOM_DARK = 'Atom-dark',
  ONEHALF_LIGHT = 'OneHalf-light',
  ONEHALF_DARK = 'OneHalf-dark',
  APPLE_SYSTEM_LIGHT = 'Apple System-light',
  APPLE_SYSTEM_DARK = 'Apple System-dark',
  CATPPUCCIN_LIGHT = 'Catppuccin-light',
  CATPPUCCIN_DARK = 'Catppuccin-dark',
  GITHUB_LIGHT = 'Github-light',
  GITHUB_DARK = 'Github-dark',
}

// 定义主题对象
const THEME: { [key in THEME_NAME]: TerminalTheme } = {
  [THEME_NAME.GITHUB_LIGHT]: {
    /** 默认前景色 */
    foreground: '#24292e',
    /** 默认背景色 */
    background: '#ffffff',
    /** 光标颜色 */
    cursor: '#0366d6',
    /** 光标高亮颜色（块光标时的前景色） */
    cursorAccent: '#ffffff',
    /** 选中文本的背景颜色（可以是透明的） */
    selectionBackground: 'rgba(175, 184, 193, 0.2)',
    /** 选中文本的前景颜色 */
    selectionForeground: '#24292e',
    /**
     * 终端失去焦点时选中文本的背景颜色（可以是透明的）
     */
    selectionInactiveBackground: 'rgba(175, 184, 193, 0.2)',
    /** ANSI 黑色（例如 `\x1b[30m`） */
    black: '#24292e',
    /** ANSI 红色（例如 `\x1b[31m`） */
    red: '#d73a49',
    /** ANSI 绿色（例如 `\x1b[32m`） */
    green: '#28a745',
    /** ANSI 黄色（例如 `\x1b[33m`） */
    yellow: '#ffd33d',
    /** ANSI 蓝色（例如 `\x1b[34m`） */
    blue: '#0366d6',
    /** ANSI 品红色（例如 `\x1b[35m`） */
    magenta: '#ea4aaa',
    /** ANSI 青色（例如 `\x1b[36m`） */
    cyan: '#1b7c83',
    /** ANSI 白色（例如 `\x1b[37m`） */
    white: '#fafbfc',
    /** ANSI 亮黑色（例如 `\x1b[1;30m`） */
    brightBlack: '#586069',
    /** ANSI 亮红色（例如 `\x1b[1;31m`） */
    brightRed: '#cb2431',
    /** ANSI 亮绿色（例如 `\x1b[1;32m`） */
    brightGreen: '#22863a',
    /** ANSI 亮黄色（例如 `\x1b[1;33m`） */
    brightYellow: '#dbab09',
    /** ANSI 亮蓝色（例如 `\x1b[1;34m`） */
    brightBlue: '#005cc5',
    /** ANSI 亮品红色（例如 `\x1b[1;35m`） */
    brightMagenta: '#e36209',
    /** ANSI 亮青色（例如 `\x1b[1;36m`） */
    brightCyan: '#0098a6',
    /** ANSI 亮白色（例如 `\x1b[1;37m`） */
    brightWhite: '#fafbfc',
    /** ANSI 扩展颜色（16 - 255） */
    extendedAnsi: [],
  },
  [THEME_NAME.GITHUB_DARK]: {
    /** 默认前景色 */
    foreground: '#c9d1d9',
    /** 默认背景色 */
    background: '#0d1117',
    /** 光标颜色 */
    cursor: '#58a6ff',
    /** 光标高亮颜色（块光标时的前景色） */
    cursorAccent: '#0d1117',
    /** 选中文本的背景颜色（可以是透明的） */
    selectionBackground: 'rgba(56, 139, 253, 0.3)',
    /** 选中文本的前景颜色 */
    selectionForeground: '#c9d1d9',
    /**
     * 终端失去焦点时选中文本的背景颜色（可以是透明的）
     */
    selectionInactiveBackground: 'rgba(56, 139, 253, 0.3)',
    /** ANSI 黑色（例如 `\x1b[30m`） */
    black: '#161b22',
    /** ANSI 红色（例如 `\x1b[31m`） */
    red: '#ff7b72',
    /** ANSI 绿色（例如 `\x1b[32m`） */
    green: '#3fb950',
    /** ANSI 黄色（例如 `\x1b[33m`） */
    yellow: '#d29922',
    /** ANSI 蓝色（例如 `\x1b[34m`） */
    blue: '#58a6ff',
    /** ANSI 品红色（例如 `\x1b[35m`） */
    magenta: '#bc8cff',
    /** ANSI 青色（例如 `\x1b[36m`） */
    cyan: '#39c5cf',
    /** ANSI 白色（例如 `\x1b[37m`） */
    white: '#c9d1d9',
    /** ANSI 亮黑色（例如 `\x1b[1;30m`） */
    brightBlack: '#6e7681',
    /** ANSI 亮红色（例如 `\x1b[1;31m`） */
    brightRed: '#ffa198',
    /** ANSI 亮绿色（例如 `\x1b[1;32m`） */
    brightGreen: '#56d364',
    /** ANSI 亮黄色（例如 `\x1b[1;33m`） */
    brightYellow: '#e3b341',
    /** ANSI 亮蓝色（例如 `\x1b[1;34m`） */
    brightBlue: '#79c0ff',
    /** ANSI 亮品红色（例如 `\x1b[1;35m`） */
    brightMagenta: '#d2a8ff',
    /** ANSI 亮青色（例如 `\x1b[1;36m`） */
    brightCyan: '#56d4dd',
    /** ANSI 亮白色（例如 `\x1b[1;37m`） */
    brightWhite: '#f0f6fc',
    /** ANSI 扩展颜色（16 - 255） */
    extendedAnsi: [],
  },
  [THEME_NAME.DRACULA]: {
    foreground: '#f8f8f2',
    background: '#282a36',
    cursor: '#ff79c6',
    cursorAccent: '#282a36',
    selectionBackground: 'rgba(255, 255, 255, 0.1)',
    selectionForeground: '#f8f8f2',
    selectionInactiveBackground: 'rgba(255, 255, 255, 0.1)',
    black: '#21222c',
    red: '#ff5555',
    green: '#50fa7b',
    yellow: '#f1fa8c',
    blue: '#bd93f9',
    magenta: '#ff79c6',
    cyan: '#8be9fd',
    white: '#f8f8f2',
    brightBlack: '#6272a4',
    brightRed: '#ff6e6e',
    brightGreen: '#69ff94',
    brightYellow: '#ffffa5',
    brightBlue: '#d6acff',
    brightMagenta: '#ff92df',
    brightCyan: '#a4ffff',
    brightWhite: '#ffffff',
    extendedAnsi: [],
  },
  [THEME_NAME.ATOM_LIGHT]: {
    foreground: '#383a42',
    background: '#fafafa',
    cursor: '#0184bc',
    cursorAccent: '#fafafa',
    selectionBackground: 'rgba(0, 0, 0, 0.1)',
    selectionForeground: '#383a42',
    selectionInactiveBackground: 'rgba(0, 0, 0, 0.1)',
    black: '#383a42',
    red: '#e45649',
    green: '#50a14f',
    yellow: '#c18401',
    blue: '#0184bc',
    magenta: '#a626a4',
    cyan: '#0997b3',
    white: '#fafafa',
    brightBlack: '#4f525d',
    brightRed: '#ca1243',
    brightGreen: '#008000',
    brightYellow: '#c678dd',
    brightBlue: '#4078f2',
    brightMagenta: '#d19a66',
    brightCyan: '#56b6c2',
    brightWhite: '#ffffff',
    extendedAnsi: [],
  },
  [THEME_NAME.ATOM_DARK]: {
    foreground: '#abb2bf',
    background: '#282c34',
    cursor: '#528bff',
    cursorAccent: '#282c34',
    selectionBackground: 'rgba(255, 255, 255, 0.1)',
    selectionForeground: '#abb2bf',
    selectionInactiveBackground: 'rgba(255, 255, 255, 0.1)',
    black: '#282c34',
    red: '#e06c75',
    green: '#98c379',
    yellow: '#e5c07b',
    blue: '#61afef',
    magenta: '#c678dd',
    cyan: '#56b6c2',
    white: '#abb2bf',
    brightBlack: '#5c6370',
    brightRed: '#be5046',
    brightGreen: '#69c069',
    brightYellow: '#d19a66',
    brightBlue: '#528bff',
    brightMagenta: '#a9a1e1',
    brightCyan: '#73c6c0',
    brightWhite: '#ffffff',
    extendedAnsi: [],
  },
  [THEME_NAME.ONEHALF_LIGHT]: {
    foreground: '#383a42',
    background: '#fafafa',
    cursor: '#0184bc',
    cursorAccent: '#fafafa',
    selectionBackground: 'rgba(0, 0, 0, 0.1)',
    selectionForeground: '#383a42',
    selectionInactiveBackground: 'rgba(0, 0, 0, 0.1)',
    black: '#383a42',
    red: '#e45649',
    green: '#50a14f',
    yellow: '#c18401',
    blue: '#0184bc',
    magenta: '#a626a4',
    cyan: '#0997b3',
    white: '#fafafa',
    brightBlack: '#4f525d',
    brightRed: '#ca1243',
    brightGreen: '#008000',
    brightYellow: '#c678dd',
    brightBlue: '#4078f2',
    brightMagenta: '#d19a66',
    brightCyan: '#56b6c2',
    brightWhite: '#ffffff',
    extendedAnsi: [],
  },
  [THEME_NAME.ONEHALF_DARK]: {
    foreground: '#abb2bf',
    background: '#282c34',
    cursor: '#528bff',
    cursorAccent: '#282c34',
    selectionBackground: 'rgba(255, 255, 255, 0.1)',
    selectionForeground: '#abb2bf',
    selectionInactiveBackground: 'rgba(255, 255, 255, 0.1)',
    black: '#282c34',
    red: '#e06c75',
    green: '#98c379',
    yellow: '#e5c07b',
    blue: '#61afef',
    magenta: '#c678dd',
    cyan: '#56b6c2',
    white: '#abb2bf',
    brightBlack: '#5c6370',
    brightRed: '#be5046',
    brightGreen: '#69c069',
    brightYellow: '#d19a66',
    brightBlue: '#528bff',
    brightMagenta: '#a9a1e1',
    brightCyan: '#73c6c0',
    brightWhite: '#ffffff',
    extendedAnsi: [],
  },
  [THEME_NAME.APPLE_SYSTEM_LIGHT]: {
    foreground: '#000000',
    background: '#ffffff',
    cursor: '#007aff',
    cursorAccent: '#ffffff',
    selectionBackground: 'rgba(0, 122, 255, 0.3)',
    selectionForeground: '#000000',
    selectionInactiveBackground: 'rgba(0, 122, 255, 0.3)',
    black: '#000000',
    red: '#ff3b30',
    green: '#4cd964',
    yellow: '#ffcc00',
    blue: '#007aff',
    magenta: '#ff2d55',
    cyan: '#5ac8fa',
    white: '#ffffff',
    brightBlack: '#8e8e93',
    brightRed: '#ff9500',
    brightGreen: '#34c759',
    brightYellow: '#ffd60a',
    brightBlue: '#0a84ff',
    brightMagenta: '#ff375f',
    brightCyan: '#64d2ff',
    brightWhite: '#ffffff',
    extendedAnsi: [],
  },
  [THEME_NAME.APPLE_SYSTEM_DARK]: {
    foreground: '#ffffff',
    background: '#000000',
    cursor: '#0a84ff',
    cursorAccent: '#000000',
    selectionBackground: 'rgba(0, 122, 255, 0.3)',
    selectionForeground: '#ffffff',
    selectionInactiveBackground: 'rgba(0, 122, 255, 0.3)',
    black: '#000000',
    red: '#ff453a',
    green: '#32d74b',
    yellow: '#ffd60a',
    blue: '#0a84ff',
    magenta: '#ff375f',
    cyan: '#64d2ff',
    white: '#ffffff',
    brightBlack: '#8e8e93',
    brightRed: '#ff9f0a',
    brightGreen: '#66ff66',
    brightYellow: '#ffff00',
    brightBlue: '#30b0ff',
    brightMagenta: '#ff69b4',
    brightCyan: '#7fffd4',
    brightWhite: '#ffffff',
    extendedAnsi: [],
  },
  [THEME_NAME.CATPPUCCIN_LIGHT]: {
    foreground: '#4c4f69',
    background: '#eff1f5',
    cursor: '#dc8a78',
    cursorAccent: '#eff1f5',
    selectionBackground: 'rgba(0, 0, 0, 0.1)',
    selectionForeground: '#4c4f69',
    selectionInactiveBackground: 'rgba(0, 0, 0, 0.1)',
    black: '#4c4f69',
    red: '#d20f39',
    green: '#40a02b',
    yellow: '#df8e1d',
    blue: '#1e66f5',
    magenta: '#8839ef',
    cyan: '#179299',
    white: '#eff1f5',
    brightBlack: '#5c5f77',
    brightRed: '#e64553',
    brightGreen: '#42be65',
    brightYellow: '#fe640b',
    brightBlue: '#31748f',
    brightMagenta: '#7287fd',
    brightCyan: '#209fb5',
    brightWhite: '#ffffff',
    extendedAnsi: [],
  },
  [THEME_NAME.CATPPUCCIN_DARK]: {
    foreground: '#cdd6f4',
    background: '#1e1e2e',
    cursor: '#f5e0dc',
    cursorAccent: '#1e1e2e',
    selectionBackground: 'rgba(255, 255, 255, 0.1)',
    selectionForeground: '#cdd6f4',
    selectionInactiveBackground: 'rgba(255, 255, 255, 0.1)',
    black: '#1e1e2e',
    red: '#f38ba8',
    green: '#a6e3a1',
    yellow: '#f9e2af',
    blue: '#89b4fa',
    magenta: '#cba6f7',
    cyan: '#94e2d5',
    white: '#cdd6f4',
    brightBlack: '#585b70',
    brightRed: '#fca5a5',
    brightGreen: '#a7f3d0',
    brightYellow: '#fde68a',
    brightBlue: '#93c5fd',
    brightMagenta: '#d8b4fe',
    brightCyan: '#a5f3fc',
    brightWhite: '#ffffff',
    extendedAnsi: [],
  },
}

/**
 * client 端发送状态枚举
 */
enum CLIENT_PROTOCOL {
  //输入命令
  KEY = '0',
  //连接
  CONNECT = '1',
  //PING心跳
  PING = '2',
  //PONG心跳
  PONG = '3',
  //调整Cols和Rows
  RESIZE = '4',
  //发送命令
  COMMAND = '5',
  //清空终端
  CLEAR = '6',
}

/**
 * ws 响应信息状态枚举
 */
enum WS_PROTOCOL {
  //命令响应成功
  OK = '0',
  //连接响应
  CONNECTED = '1',
  //PING心跳
  PING = '2',
  //PONG心跳
  PONG = '3',
  //命令响应失败
  ERROR = '4',
}

/**
 * 终端状态
 */
const TERMINAL_STATUS = {
  NOT_CONNECT: {
    value: 0,
    label: '未连接',
    color: '#FFD43B',
  },
  CONNECTED: {
    value: 20,
    label: '已连接',
    color: '#4DABF7',
  },
  DISCONNECTED: {
    value: 30,
    label: '已断开',
    color: '#ADB5BD',
  },
  ERROR: {
    value: 40,
    label: '错误',
    color: '#E03131',
  },
}

export {
  THEME,
  THEME_NAME,
  FONT_FAMILY,
  CLIENT_PROTOCOL,
  WS_PROTOCOL,
  TERMINAL_STATUS,
}
