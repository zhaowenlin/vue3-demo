import { useMessage } from '../hooks/web/useMessage'
const { createMessage } = useMessage()

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const error = createMessage.error!
export function checkStatus(status: number, msg: string): void {
  switch (status) {
    case 400:
      error(`${msg}`)
      break
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      error('请求失败401')
      break
    case 403:
      error('请求失败403')
      break
    // 404请求不存在
    case 404:
      error('请求失败')
      break
    case 405:
      error('请求失败')
      break
    case 408:
      error('请求失败')
      break
    case 500:
      error('请求失败500')
      break
    case 501:
      error('请求失败501')
      break
    case 502:
      error('请求失败502')
      break
    case 503:
      error('请求失败503')
      break
    case 504:
      error('请求失败504')
      break
    case 505:
      error('请求失败505')
      break
    default:
  }
}
