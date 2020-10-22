type NotifyType = 'warning' | 'error' | 'success' | 'info'
type NotifyPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'
type NotifyOptions = {
  description?: string
  time?: number
  icon?: boolean
  position?: NotifyPosition
}
type NotifySubscribe = NotifyOptions & {
  message: string
  type: NotifyType
}

type NotifyUnsubscribe = NotifyOptions & {
  id: number
}

const info = {
  success: {
    title: '!Listo!',
    description: 'Completado correctamente'
  },
  warning: {
    title: '!Alerta!',
    description: 'Esta informacion puede estar imcompleta'
  },
  error: {
    title: '¡Parece que hubo un problema!',
    description: 'Puedes intentar de nuevo'
  },
  info: {
    title: '¡Recordarte que!',
    description: 'Esta informacion esta disponible'
  }
}

class Notify {
  private container: HTMLElement | undefined
  private instance: Object | undefined
  private index: number = 1
  private _arrNotify: NotifyUnsubscribe[] = []
  private config: NotifyOptions = {
    description: '',
    icon: true,
    position: 'bottomRight',
    time: 6000
  }
  constructor() {
    if (typeof window !== 'undefined') {
      this.container = this.createContainer()
      if (!this.instance) {
        this._init()
      }
    }
  }

  // init
  private _init() {
    if (window && window.document) {
      const container = this.container
      if (container) {
        document.body.appendChild(container)
        const sheet = document.createElement('style')
        sheet.innerHTML = `
          #toastContainer{
            position: fixed;
            display: flex;
            flex-direction: column-reverse;
          }
          .toast-container{
            position: fixed;
          }
          .toast {
            z-index: 9999;
            min-height: 80px;
            width: 440px;
            border-radius: 8px;
            margin-top: 20px;
            overflow: hidden;
            position: relative;
            box-shadow: 2px 2px 8px rgba(106, 117, 160, 0.1), 0px 6px 20px rgba(20, 43, 127, 0.14);
          }
          .toast--topLeft{
            top: 0;
            left: 20px
          }
          .toast--topCenter{
            top: 0;
            left: 50%;
            transform: translateX(-50%);
          }
          .toast--topRight{
            top: 0;
            right: 20px
          }
          .toast--bottomLeft{
            bottom: 20px;
            left: 20px
          }
          .toast--bottomCenter{
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
          }
          .toast--bottomRight{
            bottom: 20px;
            right: 20px
          }
          .toast--success{
            background-color: #D8F7C8;
          }
          .toast--error{
            background-color: #FFD7DA;
          }
          .toast--info{
            background-color: #c7d4ff;
          }
          .toast--warning{
            background-color: #f7f1c8;
          }
          .toast__line{
            position: absolute;
            width: 6px;
            height: 100%;
            left: 0;
            top: 0;
          }
          .toast__line--success {
            background-color: #83CC5E;
          }
          .toast__line--error{
            background-color: #EF3340;
          }
          .toast__line--info{
            background-color: #335bef;
          }
          .toast__line--warning{
            background-color: #f6b523;
          }
          .toast__content{
            display: flex;
            padding: 16px 16px 16px 28px;
            box-sizing: border-box;
            height: 100%;
          }
          .toast__box-icon{
            margin-right: 1rem;
          }
          .toast__box-info{
            flex: 1;
            display: flex;
            justify-content: space-between;
          }
          .toast__box-close{
            display: flex;
            align-items: center;
          }
          .toast__title{
            font-size: 1rem;
            margin: 0;
            font-family: sans-serif;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
            letter-spacing: 0.20px;
            text-align: left;
            color: #494F66
          }
          .toast__description{
            font-family: sans-serif;
            margin: 0;
            color: #494F66;
            font-size: 14px;
            font-style: normal;
            font-weight: 300;
            line-height: 24px;
            letter-spacing: 0px;
            text-align: left;
          }
          .toast__svg{
            cursor: pointer;
          }
          .toast__svg--success path{
            stroke: #83CC5E;
          }
          .toast__svg--error path{
            stroke: #EF3340;
          }
          .toast__svg--info path{
            stroke: #335bef;
          }
          .toast__svg--warning path {
            stroke: #f6b523;
          }
          .animateInOpacity {
            animation: showOpacity .15s;
          }
          .animateOutOpacity {
            animation: hideOpacity .15s;
          }
          @keyframes showOpacity {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes hideOpacity {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }
        `
        container.appendChild(sheet)
        this.instance = Notify
      } else {
        throw new Error('Error - Access node element')
      }
    } else {
      throw new Error('Error - Reader Window')
    }
  }

  // setters

  private createContainer(): HTMLElement | undefined {
    const container = document.getElementById('toastContainer')
    if (container) return

    const toastContainer = Object.assign(document.createElement('div'), {
      id: 'toastContainer'
    })

    return toastContainer
  }

  // private createContainerNotify(): HTMLElement | undefined {
  //   const hasDivNotification = document.getElementById('divNotification')
  //   if (hasDivNotification) return

  //   const divNotification = Object.assign(document.createElement('div'), {
  //     id: 'divNotification'
  //   })

  //   return divNotification
  // }

  private getIcon(type: NotifyType): string {
    switch (type) {
      case 'success':
        return `
          <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="12" fill="#83CC5E" />
          <path
            d="M7.05884 12L10.353 15.5294L16.9412 8.47058"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        `
      case 'error':
        return `
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.7064 17.6375L14.0315 4.1652C13.1523 2.6116 10.8474 2.6116 9.96824 4.1652L2.29328 17.6375C1.43787 19.1447 2.55466 20.9998 4.33677 20.9998H19.6867C21.445 21.023 22.5618 19.1679 21.7064 17.6375ZM11.8216 7.55067H12.1305C12.582 7.55067 12.9622 7.92168 12.9384 8.36225L12.7959 14.368C12.7959 14.5535 12.6295 14.7158 12.4394 14.7158H11.5127C11.3226 14.7158 11.1563 14.5767 11.1563 14.368L11.0137 8.36225C10.99 7.92168 11.3702 7.55067 11.8216 7.55067ZM11.988 18.2868C11.3226 18.2868 10.7761 17.7534 10.7761 17.1042C10.7761 16.4549 11.3226 15.9216 11.988 15.9216C12.6533 15.9216 13.1998 16.4549 13.1998 17.1042C13.2236 17.7534 12.677 18.2868 11.988 18.2868Z"
              fill="#FC4E55"
            />
        `
      case 'info':
        return `
          <svg  width="24"
            height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.625 23.625" style="enable-background:new 0 0 23.625 23.625;" xml:space="preserve">
          <path fill="#335bef" d="M11.812,0C5.289,0,0,5.289,0,11.812s5.289,11.813,11.812,11.813s11.813-5.29,11.813-11.813   S18.335,0,11.812,0z M14.271,18.307c-0.608,0.24-1.092,0.422-1.455,0.548c-0.362,0.126-0.783,0.189-1.262,0.189   c-0.736,0-1.309-0.18-1.717-0.539s-0.611-0.814-0.611-1.367c0-0.215,0.015-0.435,0.045-0.659c0.031-0.224,0.08-0.476,0.147-0.759   l0.761-2.688c0.067-0.258,0.125-0.503,0.171-0.731c0.046-0.23,0.068-0.441,0.068-0.633c0-0.342-0.071-0.582-0.212-0.717   c-0.143-0.135-0.412-0.201-0.813-0.201c-0.196,0-0.398,0.029-0.605,0.09c-0.205,0.063-0.383,0.12-0.529,0.176l0.201-0.828   c0.498-0.203,0.975-0.377,1.43-0.521c0.455-0.146,0.885-0.218,1.29-0.218c0.731,0,1.295,0.178,1.692,0.53   c0.395,0.353,0.594,0.812,0.594,1.376c0,0.117-0.014,0.323-0.041,0.617c-0.027,0.295-0.078,0.564-0.152,0.811l-0.757,2.68   c-0.062,0.215-0.117,0.461-0.167,0.736c-0.049,0.275-0.073,0.485-0.073,0.626c0,0.356,0.079,0.599,0.239,0.728   c0.158,0.129,0.435,0.194,0.827,0.194c0.185,0,0.392-0.033,0.626-0.097c0.232-0.064,0.4-0.121,0.506-0.17L14.271,18.307z    M14.137,7.429c-0.353,0.328-0.778,0.492-1.275,0.492c-0.496,0-0.924-0.164-1.28-0.492c-0.354-0.328-0.533-0.727-0.533-1.193   c0-0.465,0.18-0.865,0.533-1.196c0.356-0.332,0.784-0.497,1.28-0.497c0.497,0,0.923,0.165,1.275,0.497   c0.353,0.331,0.53,0.731,0.53,1.196C14.667,6.703,14.49,7.101,14.137,7.429z"/>
          </svg>
        `
      case 'warning':
        return `
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#f6b523" d="M501.609,384.603L320.543,51.265c-13.666-23.006-37.802-36.746-64.562-36.746c-26.76,0-50.896,13.74-64.562,36.746    c-0.103,0.176-0.19,0.352-0.293,0.528L10.662,384.076c-13.959,23.491-14.223,51.702-0.719,75.457    c13.535,23.769,37.919,37.948,65.266,37.948h360.544c27.347,0,52.733-14.179,66.267-37.948    C515.524,435.779,515.261,407.566,501.609,384.603z M225.951,167.148c0-16.586,13.445-30.03,30.03-30.03    c16.586,0,30.03,13.445,30.03,30.03v120.121c0,16.584-13.445,30.03-30.03,30.03s-30.03-13.447-30.03-30.03V167.148z     M255.981,437.421c-24.839,0-45.046-20.206-45.046-45.046c0-24.839,20.206-45.045,45.046-45.045    c24.839,0,45.045,20.206,45.045,45.045C301.027,417.214,280.821,437.421,255.981,437.421z"/>
        </svg>
        `
      default:
        return ''
    }
  }

  protected removeNotify(id: number) {
    const arr = this._arrNotify.filter(notify => notify.id !== id)
    this.arrNotify = arr
    this.animateOut(id)
  }

  private setNotify(data: NotifySubscribe): Node {
    const { type, message, icon, description, position } = data
    const item = Object.assign(document.createElement('div'), {
      className: `toast-container toast--${position}`,
      id: `notify-${this.index}`,
      innerHTML: `
      <div class="toast toast--${type}">
        <div class="toast__line toast__line--${type}"></div>
        <div class="toast__content">
          ${
            icon
              ? `
            <div class="toast__box-icon">${this.getIcon(type)}</div>
          `
              : ''
          }
          <div class="toast__box-info">
            <div>
              <p class="toast__title">${message || info[type].title}</p>
              <p class="toast__description"> ${description ||
                info[type].description}</p>
            </div>
            <div class="toast__box-close">
              <svg
                data-notify=${this.index}
                class="toast__svg toast__svg--${type}"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.3033 6.69672L6.69668 17.3033"
                  stroke={stroke}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.3033 17.3033L6.69668 6.69668"
                  stroke={stroke}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      `
    })

    return item
  }

  private updateIndex() {
    this.index += 1
  }

  // animations
  protected animateOut(id: number) {
    const target: HTMLElement | null = document.getElementById(`notify-${id}`)

    if (target) {
      target.addEventListener('animationend', () => {
        target.style.opacity = '0'
        target.remove()
      })
      target.classList.add('animateOutOpacity')
    }
  }

  protected animateIn() {
    const target = document.getElementById(`notify-${this.index}`)
    if (target) {
      this.updateIndex()
      target.addEventListener('animationend', () => {
        target.style.opacity = '1'
      })
      target.classList.add('animateInOpacity')
    }
  }

  private set arrNotify(arr: NotifyUnsubscribe[]) {
    this._arrNotify = arr
  }

  private get arrNotify() {
    return this._arrNotify
  }

  private subscribe(subscriptor: NotifySubscribe) {
    const data = { ...subscriptor, id: this.index }
    this.arrNotify = [...this.arrNotify, data]
    const containner = this.container
    if (containner) {
      const element = this.setNotify(subscriptor)
      if (element) {
        containner.appendChild(element)
        const close = document.querySelectorAll('.toast__svg')
        const _this = this
        close.forEach(function(node: any) {
          const self = node
          node.addEventListener('click', () => {
            _this.removeNotify(self.dataset.notify)
          })
        })
        this.animateIn()
        this.unsubscribe(data)
      }
    }
  }

  private unsubscribe(subscriptor: NotifyUnsubscribe) {
    setTimeout(() => {
      const arr = this.arrNotify.filter(item => item.id !== subscriptor.id)
      this.arrNotify = arr
      this.animateOut(subscriptor.id)
    }, subscriptor.time)
  }

  // methods

  public success(message: string, options: NotifyOptions) {
    const data = {
      ...this.config,
      ...options
    }
    this.subscribe({ message, ...data, type: 'success' })
  }
  public warning(message: string, options: NotifyOptions) {
    const data = {
      ...this.config,
      ...options
    }
    this.subscribe({ message, ...data, type: 'warning' })
  }
  public error(message: string, options: NotifyOptions) {
    const data = {
      ...this.config,
      ...options
    }
    this.subscribe({ message, ...data, type: 'error' })
  }
  public info(message: string, options: NotifyOptions) {
    const data = {
      ...this.config,
      ...options
    }
    this.subscribe({ message, ...data, type: 'info' })
  }
}

const notify = new Notify()

export default notify
